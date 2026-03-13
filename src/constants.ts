export const EMAIL_TEMPLATES = [
  {
    id: 'saas-outreach',
    title: 'SaaS Outreach',
    prompt: `Write a personalized cold email for a SaaS company.

Goal:
Start a conversation with a potential customer.

Tone:
Friendly and professional.

Structure:
1. Personalized opening referencing the company.
2. Brief introduction.
3. Explain how our solution helps companies like theirs.
4. Soft call to action asking if they are open to learning more.

Keep the email under 100 words.

Output:
Subject line + email body.`
  },
  {
    id: 'agency-outreach',
    title: 'Agency Outreach',
    prompt: `Write a cold email targeting marketing agencies.

Goal:
Offer a tool that helps agencies scale outreach and save time.

Tone:
Professional but conversational.

Structure:
1. Mention the agency industry challenge.
2. Introduce the solution.
3. Explain how it helps agencies manage outreach faster.
4. Ask if they would like a quick demo.

Keep the email concise and natural.

Output:
3 subject lines and one email.`
  },
  {
    id: 'startup-founder-outreach',
    title: 'Startup Founder Outreach',
    prompt: `Write a personalized cold email targeting startup founders.

Goal:
Introduce a tool that helps founders automate personalized cold outreach.

Tone:
Direct and friendly.

Structure:
1. Reference startup growth challenges.
2. Explain how AI can help scale outreach.
3. Show a quick benefit.
4. Ask a simple question to start a conversation.

Keep the email under 80 words.

Output:
Subject line + email body.`
  },
  {
    id: 'linkedin-followup',
    title: 'LinkedIn Follow-up',
    prompt: `Write a short follow-up email after connecting on LinkedIn.

Goal:
Continue the conversation and introduce a helpful tool.

Tone:
Casual and friendly.

Structure:
1. Mention the LinkedIn connection.
2. Short introduction.
3. Quick value statement.
4. Ask if they would like to see how it works.

Keep the email short (60–80 words).

Output:
Subject line + email body.`
  },
  {
    id: 'cold-intro',
    title: 'Cold Intro',
    prompt: `Write a simple cold introduction email.

Goal:
Start a conversation with a new prospect.

Tone:
Friendly and natural.

Structure:
1. Personalized opening.
2. Explain why you are reaching out.
3. One key value proposition.
4. Soft question to start a conversation.

Keep it under 90 words.

Output:
3 subject lines and email body.`
  },
  {
    id: 'demo-request',
    title: 'Demo Request',
    prompt: `Write a cold email asking if the prospect would be open to a short demo.

Tone:
Professional and respectful.

Structure:
1. Personalized opening.
2. Brief explanation of the tool.
3. Highlight one strong benefit.
4. Ask if they would be open to a 10-minute demo.

Keep it concise.

Output:
Subject line + email body.`
  }
];
