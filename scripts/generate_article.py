#!/usr/bin/env python3
"""
Article Generator for GTI News
Generates complete article with automatic image resolution
"""

import os
import sys
import json
import re
from pathlib import Path
from datetime import datetime, timedelta
import subprocess

# Add workspace scripts to path
sys.path.insert(0, str(Path.home() / ".openclaw/workspace/scripts"))
from image_resolver import ImageResolver

class ArticleGenerator:
    def __init__(self):
        self.data_file = Path(__file__).parent.parent / "frontend" / "lib" / "data.ts"
        self.image_resolver = ImageResolver()
        
    def generate_article(self, draft_data: dict) -> dict:
        """
        Generate complete article with automatic image
        
        draft_data = {
            'title': str,
            'category': str,
            'severity': str,
            'status': str,  # active, ongoing, etc.
            'location': str,
            'country': str,
            'summary': str,
            'body': list[str],
            'tl_dr': list[str],
            'whatThisMeans': str,
            'whatChanged': str,
            'whoIsAffected': str,
            'whatToDo': str,
            'sources': list[dict],
        }
        """
        print(f"📝 Generating article: {draft_data['title']}")
        
        # Step 1: Generate slug
        slug = self._generate_slug(draft_data['title'])
        print(f"🔗 Slug: {slug}")
        
        # Step 2: Auto-resolve image
        print(f"🖼️  Resolving image...")
        image_url = self.image_resolver.resolve_image(
            draft_data['title'],
            draft_data['category'],
            draft_data.get('country', '')
        )
        
        if not image_url:
            # Fallback to generic travel image
            image_url = "http://89.167.53.202/processed/hero/generic-travel.jpg"
            print(f"⚠️  Using fallback image: {image_url}")
        
        # Step 3: Generate image alt text
        image_alt = self._generate_image_alt(draft_data)
        
        # Step 4: Generate IDs and dates
        article_id = self._get_next_id()
        now = datetime.utcnow()
        published_at = draft_data.get('publishedAt', now.isoformat() + 'Z')
        
        # Step 5: Build article object
        article = {
            'id': str(article_id),
            'slug': slug,
            'title': draft_data['title'],
            'summary': draft_data['summary'],
            'category': draft_data['category'].lower(),
            'location': {
                'country': draft_data.get('country', 'Unknown'),
                'city': draft_data.get('city', ''),
                'countryCode': self._get_country_code(draft_data.get('country', ''))
            },
            'severity': draft_data['severity'].lower(),
            'status': draft_data.get('status', 'update').lower(),
            'articleStatus': 'active',
            'publishedAt': published_at,
            'updatedAt': now.isoformat() + 'Z',
            'heroImage': {
                'src': image_url,
                'alt': image_alt
            },
            'tl_dr': draft_data['tl_dr'],
            'body': draft_data['body'],
            'whatThisMeans': draft_data['whatThisMeans'],
            'whatChanged': draft_data['whatChanged'],
            'whoIsAffected': draft_data['whoIsAffected'],
            'whatToDo': draft_data['whatToDo'],
            'sources': draft_data.get('sources', []),
            'impactRegions': draft_data.get('impactRegions', []),
            'relatedArticles': draft_data.get('relatedArticles', [])
        }
        
        # Step 6: Add to data.ts
        self._add_to_datats(article)
        
        print(f"✅ Article generated successfully!")
        print(f"📄 ID: {article_id}")
        print(f"🔗 Slug: {slug}")
        print(f"🖼️  Image: {image_url}")
        
        return article
    
    def _generate_slug(self, title: str) -> str:
        """Generate URL-friendly slug from title"""
        # Remove special chars, keep alphanumeric and spaces
        clean = re.sub(r'[^\w\s-]', '', title.lower())
        # Replace spaces with hyphens
        slug = clean.strip().replace(' ', '-')
        # Remove multiple hyphens
        slug = re.sub(r'-+', '-', slug)
        return slug[:100]  # Max length
    
    def _generate_image_alt(self, draft_data: dict) -> str:
        """Generate descriptive alt text for image"""
        location = draft_data.get('country', draft_data.get('location', ''))
        category = draft_data['category']
        
        templates = {
            'flights': f"Airport and flight operations in {location}",
            'visa': f"Travel documents and visa information for {location}",
            'hotels': f"Hotel and accommodation scene in {location}",
            'destinations': f"Travel destination view of {location}",
            'safety': f"Travel safety information for {location}",
            'weather': f"Weather and climate scene in {location}"
        }
        
        return templates.get(category.lower(), f"Travel scene from {location}")
    
    def _get_next_id(self) -> int:
        """Get next article ID from data.ts"""
        try:
            content = self.data_file.read_text()
            # Find all id: 'X' patterns
            ids = re.findall(r"id: '(\d+)'", content)
            if ids:
                return max(int(i) for i in ids) + 1
            return 1
        except Exception as e:
            print(f"⚠️  Could not determine next ID: {e}")
            return 99
    
    def _get_country_code(self, country: str) -> str:
        """Get ISO country code"""
        codes = {
            'united kingdom': 'GB', 'uk': 'GB', 'great britain': 'GB',
            'japan': 'JP',
            'thailand': 'TH',
            'norway': 'NO',
            'france': 'FR',
            'greece': 'GR',
            'italy': 'IT',
            'spain': 'ES',
            'germany': 'DE',
            'iceland': 'IS',
            'dubai': 'AE', 'united arab emirates': 'AE', 'uae': 'AE',
            'global': 'INT'
        }
        return codes.get(country.lower(), 'INT')
    
    def _add_to_datats(self, article: dict):
        """Add article to data.ts file"""
        try:
            # Read current content
            content = self.data_file.read_text()
            
            # Convert article to TypeScript format
            article_ts = self._article_to_typescript(article)
            
            # Find where to insert (after "sampleArticles: Article[] = [")
            marker = "sampleArticles: Article[] = ["
            if marker in content:
                # Insert after marker
                pos = content.find(marker) + len(marker)
                new_content = content[:pos] + "\n" + article_ts + "," + content[pos:]
                
                # Write back
                self.data_file.write_text(new_content)
                print(f"✅ Added to data.ts")
            else:
                print(f"⚠️  Could not find insertion point in data.ts")
                
        except Exception as e:
            print(f"❌ Error updating data.ts: {e}")
            raise
    
    def _article_to_typescript(self, article: dict) -> str:
        """Convert article dict to TypeScript string"""
        ts = f"""{{
    id: '{article['id']}',
    slug: '{article['slug']}',
    title: '{article['title'].replace("'", "\\'")}',
    summary: '{article['summary'].replace("'", "\\'")}',
    category: '{article['category']}',
    location: {{ country: '{article['location']['country']}', city: '{article['location'].get('city', '')}', countryCode: '{article['location']['countryCode']}' }},
    severity: '{article['severity']}',
    status: '{article['status']}',
    articleStatus: '{article['articleStatus']}',
    publishedAt: '{article['publishedAt']}',
    updatedAt: '{article['updatedAt']}',

    heroImage: {{
      src: '{article['heroImage']['src']}',
      alt: '{article['heroImage']['alt'].replace("'", "\\'")}',
    }},
    tl_dr: {json.dumps(article['tl_dr'])},
    body: {json.dumps(article['body'])},
    whatThisMeans: '{article['whatThisMeans'].replace("'", "\\'")}',
    whatChanged: '{article['whatChanged'].replace("'", "\\'")}',
    whoIsAffected: '{article['whoIsAffected'].replace("'", "\\'")}',
    whatToDo: '{article['whatToDo'].replace("'", "\\'")}',
    sources: {json.dumps(article['sources'])},
    impactRegions: {json.dumps(article.get('impactRegions', []))},
    relatedArticles: {json.dumps(article.get('relatedArticles', []))},
  }}"""
        return ts


# CLI Interface
if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Generate GTI News Article")
    parser.add_argument('--title', required=True, help='Article title')
    parser.add_argument('--category', required=True, choices=['flights', 'visa', 'hotels', 'destinations', 'safety', 'weather'], help='Category')
    parser.add_argument('--severity', required=True, choices=['critical', 'high', 'medium', 'low'], help='Severity')
    parser.add_argument('--country', required=True, help='Country/Location')
    parser.add_argument('--summary', required=True, help='Summary/TL;DR')
    parser.add_argument('--file', help='JSON file with full article data')
    
    args = parser.parse_args()
    
    generator = ArticleGenerator()
    
    if args.file:
        # Load from JSON file
        with open(args.file) as f:
            draft_data = json.load(f)
    else:
        # Simple mode - requires more manual input
        print("❌ Use --file with full article JSON for now")
        print("Or create draft manually using GTI_WORKFLOW.md template")
        sys.exit(1)
    
    try:
        article = generator.generate_article(draft_data)
        print(f"\n🎉 Success! Article created: {article['slug']}")
        print(f"🚀 Ready to deploy: npm run build && git add . && git commit -m 'feat: article added' && git push")
    except Exception as e:
        print(f"❌ Failed to generate article: {e}")
        sys.exit(1)