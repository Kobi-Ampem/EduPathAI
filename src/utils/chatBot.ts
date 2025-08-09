export const getBotResponse = (userMessage: string): string => {
  const message = userMessage.toLowerCase();

  // Mental Health responses
  if (message.includes('mental health') || message.includes('stress') || message.includes('anxiety')) {
    return "I understand you're looking for mental health support. It's important to take care of your mental wellbeing. Consider talking to a school counselor, practicing mindfulness, and maintaining a healthy work-life balance. Remember, seeking help is a sign of strength, not weakness.";
  }

  // Academic advice
  if (message.includes('academic') || message.includes('study') || message.includes('school')) {
    return "For academic success, I recommend creating a structured study schedule, using active learning techniques like flashcards and practice tests, and forming study groups with classmates. Don't forget to take regular breaks and get enough sleep!";
  }

  // Career advice
  if (message.includes('career') || message.includes('job') || message.includes('future')) {
    return "Career planning is exciting! Start by exploring your interests and strengths. Research different career paths, talk to professionals in fields that interest you, and consider gaining experience through internships or volunteering. Remember, career paths can evolve over time.";
  }

  // SHS program advice
  if (message.includes('shs') || message.includes('program') || message.includes('science') || message.includes('arts') || message.includes('business')) {
    return "Choosing an SHS program is an important decision! Consider your favorite subjects, career interests, and learning style. General Science is great for future healthcare or engineering careers, General Arts for humanities and social sciences, Business for entrepreneurship, and Technical/Vocational for hands-on skills.";
  }

  // General study tips
  if (message.includes('tips') || message.includes('advice') || message.includes('help')) {
    return "I'm here to help! I can provide advice on academic success, career planning, mental health, and choosing the right SHS program. What specific area would you like to explore? You can also use the quick action buttons below for common topics.";
  }

  // Greeting responses
  if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
    return "Hello! I'm EduBot, your educational guidance assistant. I'm here to help you with academic advice, career planning, mental health support, and choosing the right SHS program. What would you like to discuss today?";
  }

  // Default response
  return "That's an interesting question! I specialize in educational guidance, career advice, and academic support. Could you tell me more about what specific area you'd like help with? I can assist with study tips, career planning, mental health, or choosing an SHS program.";
};