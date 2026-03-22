#!/usr/bin/env python3
"""
Integrated Article Creator for GTI News
Combines article generation with automatic image resolution
Usage: Karlson (or any agent) calls this when creating articles
"""

import os
import sys
import re
import json
from pathlib import Path
from datetime import datetime

# Add paths
sys.path.insert(0, str(Path.home() / ".openclaw/workspace/scripts"))
from image_resolver import ImageResolver

class IntegratedArticleCreator:
    def __init__(self):
        self.data_file = Path.home() / ".openclaw/workspace/gti-articles/news-platform/frontend/lib/data.ts"
        self.image_resolver = ImageResolver()
        
    def create_article(self, article_data: dict) -> dict:
        """
        Create complete article with automatic image
        
        article_data = {
            'title': str (required),
            'category': str (required),
            'severity': str (required),
            'country': str (required),
            'city': str (optional),
            'summary': str (required),
            'tl_dr': list[str] (required),
            'body': list[str] (required),
            'whatThisMeans': str (required),
            'whatChanged': str (required),
            'whoIsAffected': str (required),
            'whatToDo': str (required),
            'sources': list[dict] (optional),
            'status': str (optional, default='update'),
        }
        """
        print(f"📝 Creating article: {article_data['title']}")
        
        # Step 1: Generate metadata
        article_id = self._get_next_id()
        slug = self._generate_slug(article_data['title'])
        now = datetime.utcnow().isoformat() + 'Z'
        
        print(f"🆔 ID: {article_id}")
        print(f"🔗 Slug: {slug}")
        
        # Step 2: AUTO IMAGE RESOLUTION
        print(f"🖼️  Auto-resolving image...")
        image_url = self.image_resolver.resolve_image(
            article_data['title'],
            article_data['category'],
            article_data.get('country', '')
        )
        
        if not image_url:
            print(f"⚠️  Using fallback image")
            image_url = "http://89.167.53.202/processed/hero/generic-travel.jpg"
        
        # Step 3: Build complete article
        article = {
            'id': str(article_id),
            'slug': slug,
            'title': article_data['title'],
            'summary': article_data['summary'],
            'category': article_data['category'].lower(),
            'location': {
                'country': article_data['country'],
                'city': article_data.get('city', ''),
                'countryCode': self._get_country_code(article_data['country'])
            },
            'severity': article_data['severity'].lower(),
            'status': article_data.get('status', 'update').lower(),
            'articleStatus': 'active',
            'publishedAt': now,
            'updatedAt': now,
            'heroImage': {
                'src': image_url,
                'alt': self._generate_image_alt(article_data)
            },
            'tl_dr': article_data['tl_dr'],
            'body': article_data['body'],
            'whatThisMeans': article_data['whatThisMeans'],
            'whatChanged': article_data['whatChanged'],
            'whoIsAffected': article_data['whoIsAffected'],
            'whatToDo': article_data['whatToDo'],
            'sources': article_data.get('sources', []),
            'impactRegions': article_data.get('impactRegions', [article_data['country']]),
            'relatedArticles': article_data.get('relatedArticles', [])
        }
        
        # Step 4: Add to data.ts
        self._add_to_datats(article)
        
        print(f"✅ Article {article_id} created successfully!")
        print(f"🖼️  Image: {image_url}")
        print(f"🚀 Ready to build and deploy")
        
        return article
    
    def _get_next_id(self) -> int:
        """Get next article ID"""
        try:
            content = self.data_file.read_text()
            ids = re.findall(r"id: '(\d+)'", content)
            if ids:
                return max(int(i) for i in ids) + 1
            return 1
        except:
            return 99
    
    def _generate_slug(self, title: str) -> str:
        """Generate URL-friendly slug"""
        clean = re.sub(r'[^\w\s-]', '', title.lower())
        slug = clean.strip().replace(' ', '-')
        slug = re.sub(r'-+', '-', slug)
        return slug[:100]
    
    def _get_country_code(self, country: str) -> str:
        """Get ISO country code"""
        codes = {
            'united kingdom': 'GB', 'uk': 'GB',
            'japan': 'JP', 'thailand': 'TH', 'norway': 'NO',
            'france': 'FR', 'greece': 'GR', 'italy': 'IT',
            'spain': 'ES', 'germany': 'DE', 'iceland': 'IS',
            'new zealand': 'NZ', 'dubai': 'AE', 'uae': 'AE',
            'global': 'INT'
        }
        return codes.get(country.lower(), 'INT')
    
    def _generate_image_alt(self, article_data: dict) -> str:
        """Generate alt text"""
        location = article_data.get('country', '')
        category = article_data['category']
        templates = {
            'flights': f"Airport scene in {location}",
            'visa': f"Travel documents for {location}",
            'hotels': f"Hotel in {location}",
            'destinations': f"Travel destination in {location}",
            'safety': f"Travel safety in {location}",
            'weather': f"Weather in {location}"
        }
        return templates.get(category.lower(), f"Travel in {location}")
    
    def _add_to_datats(self, article: dict):
        """Add article to data.ts"""
        try:
            content = self.data_file.read_text()
            
            # Convert to TypeScript
            article_ts = self._article_to_ts(article)
            
            # Find insertion point
            marker = "sampleArticles: Article[] = ["
            if marker in content:
                pos = content.find(marker) + len(marker)
                new_content = content[:pos] + "\n" + article_ts + "," + content[pos:]
                self.data_file.write_text(new_content)
                print(f"✅ Added to data.ts")
            else:
                print(f"⚠️  Could not find insertion point")
                
        except Exception as e:
            print(f"❌ Error updating data.ts: {e}")
            raise
    
    def _article_to_ts(self, article: dict) -> str:
        """Convert to TypeScript"""
        return f"""{{
    id: '{article['id']}',
    slug: '{article['slug']}',
    title: {json.dumps(article['title'])},
    summary: {json.dumps(article['summary'])},
    category: '{article['category']}',
    location: {{ country: {json.dumps(article['location']['country'])}, city: {json.dumps(article['location'].get('city', ''))}, countryCode: '{article['location']['countryCode']}' }},
    severity: '{article['severity']}',
    status: '{article['status']}',
    articleStatus: '{article['articleStatus']}',
    publishedAt: '{article['publishedAt']}',
    updatedAt: '{article['updatedAt']}',

    heroImage: {{
      src: '{article['heroImage']['src']}',
      alt: {json.dumps(article['heroImage']['alt'])},
    }},
    tl_dr: {json.dumps(article['tl_dr'])},
    body: {json.dumps(article['body'])},
    whatThisMeans: {json.dumps(article['whatThisMeans'])},
    whatChanged: {json.dumps(article['whatChanged'])},
    whoIsAffected: {json.dumps(article['whoIsAffected'])},
    whatToDo: {json.dumps(article['whatToDo'])},
    sources: {json.dumps(article['sources'])},
    impactRegions: {json.dumps(article['impactRegions'])},
    relatedArticles: {json.dumps(article['relatedArticles'])},
  }}"""


if __name__ == "__main__":
    # Example usage
    creator = IntegratedArticleCreator()
    
    # Test article
    test_article = {
        'title': 'Singapore Expands Changi Airport Terminal 5 Construction',
        'category': 'destinations',
        'severity': 'medium',
        'country': 'Singapore',
        'city': 'Changi',
        'summary': 'Singapore announces accelerated timeline for Changi Airport Terminal 5, expanding capacity for post-pandemic travel recovery.',
        'tl_dr': [
            'Singapore: Changi Terminal 5 construction accelerated.',
            'New terminal adds 50 million passenger capacity annually.',
            'Expected completion moved to 2030.',
            'Construction impact on existing terminals minimal.'
        ],
        'body': [
            'Singapore authorities have announced an accelerated construction timeline for Changi Airport Terminal 5, the airport largest expansion project to date. The new terminal will add significant capacity to handle post-pandemic travel growth.',
            'The expanded timeline reflects confidence in aviation recovery and Singapore strategic position as a regional hub. Terminal 5 will feature advanced automation and sustainable design elements.',
            'FAQ:\n\n**Q: Will Terminal 5 replace existing terminals?**\nA: No, it complements the existing terminal network.\n\n**Q: When will it open?**\nA: First phase expected 2030, subject to construction progress.'
        ],
        'whatThisMeans': 'Travelers can expect continued Changi Airport leadership in passenger experience and connectivity. The expansion supports long-term growth in Asia-Pacific travel.',
        'whatChanged': 'Singapore Civil Aviation Authority announced accelerated construction timeline with updated completion targets for Terminal 5.',
        'whoIsAffected': 'Passengers traveling through Singapore Changi Airport, airlines operating at Changi, and the broader Asia-Pacific aviation market.',
        'whatToDo': '1) No immediate action required for travelers.\n2) Expect continued high service standards during construction.\n3) Monitor for any temporary terminal adjustments.\n\nACTION REQUIRED: None - informational update for future travel planning.',
        'sources': [
            {'name': 'Changi Airport Group', 'url': 'https://www.changiairport.com', 'isOfficial': True}
        ]
    }
    
    article = creator.create_article(test_article)
    print(f"\n🎉 SUCCESS! Article ready at: http://globaltravelsinfo.com/article/{article['slug']}")
