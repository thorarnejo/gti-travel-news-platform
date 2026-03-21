import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Brevo API configuration
const BREVO_API_KEY = process.env.BREVO_API_KEY;
const BREVO_API_URL = 'https://api.brevo.com/v3';
const BREVO_LIST_ID = Number(process.env.BREVO_LIST_ID || 2);

interface SubscribeRequest {
  email: string;
  firstName?: string;
  lastName?: string;
  preferences?: Record<string, any>;
}

// Add subscriber to Brevo
async function addToBrevo(email: string, firstName?: string, lastName?: string): Promise<string | null> {
  if (!BREVO_API_KEY) {
    console.warn('BREVO_API_KEY not configured, skipping Brevo sync');
    return null;
  }

  try {
    const response = await fetch(`${BREVO_API_URL}/contacts`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        email: email,
        attributes: {
          FIRSTNAME: firstName || '',
          LASTNAME: lastName || '',
        },
        listIds: [BREVO_LIST_ID],
        updateEnabled: true, // Update if contact already exists
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Brevo contact created:', data.id);
      return data.id?.toString() || null;
    } else if (response.status === 204) {
      // Contact already exists and was updated
      console.log('Brevo contact updated');
      return null;
    } else {
      const error = await response.text();
      console.error('Brevo API error:', error);
      return null;
    }
  } catch (error) {
    console.error('Brevo sync error:', error);
    return null;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body: SubscribeRequest = await request.json();
    const { email, firstName, lastName, preferences = {} } = body;

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, error: 'Valid email is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check if already subscribed
    const existingCheck = await pool.query(
      'SELECT id, status FROM subscribers WHERE email = $1',
      [normalizedEmail]
    );

    if (existingCheck.rows.length > 0) {
      const existing = existingCheck.rows[0];
      
      if (existing.status === 'active') {
        return NextResponse.json(
          { success: false, error: 'You are already subscribed!' },
          { status: 409 }
        );
      }
      
      // Reactivate unsubscribed user
      if (existing.status === 'unsubscribed') {
        await pool.query(
          `UPDATE subscribers 
           SET status = 'active', unsubscribed_at = NULL, updated_at = NOW() 
           WHERE id = $1`,
          [existing.id]
        );
        
        // Re-add to Brevo
        await addToBrevo(normalizedEmail, firstName, lastName);
        
        return NextResponse.json({
          success: true,
          message: 'Welcome back! Your subscription has been reactivated.',
        });
      }
    }

    // Add to Brevo first
    const brevoContactId = await addToBrevo(normalizedEmail, firstName, lastName);

    // Insert into database
    const result = await pool.query(
      `INSERT INTO subscribers (email, first_name, last_name, preferences, brevo_contact_id, source, status)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (email) DO UPDATE 
       SET status = 'active', updated_at = NOW()
       RETURNING id`,
      [
        normalizedEmail,
        firstName || null,
        lastName || null,
        JSON.stringify(preferences),
        brevoContactId,
        'website',
        'active',
      ]
    );

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed! Check your email for confirmation.',
      subscriberId: result.rows[0]?.id,
    });

  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { success: false, error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

// Get subscription status
export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get('email');
  
  if (!email) {
    return NextResponse.json(
      { success: false, error: 'Email parameter required' },
      { status: 400 }
    );
  }

  try {
    const result = await pool.query(
      'SELECT status, subscribed_at FROM subscribers WHERE email = $1',
      [email.toLowerCase().trim()]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ subscribed: false });
    }

    return NextResponse.json({
      subscribed: result.rows[0].status === 'active',
      status: result.rows[0].status,
      subscribedAt: result.rows[0].subscribed_at,
    });

  } catch (error) {
    console.error('Status check error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to check status' },
      { status: 500 }
    );
  }
}
