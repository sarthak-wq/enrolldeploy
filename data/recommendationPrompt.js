function generateAdvancedRecommendationPrompt(userProfile, courses, userInput) {
    return `

Personalized Course Recommendation System - Advanced Academic and Career Development

User Question:  
*${userInput}*

Note: If the user's question is outside the context of academic or course recommendations, respond with:  
"I am sorry, I do not have a recommendation for that." and don't generate any further response. Do not suggest
any courses outside of the course catalog.


Student Profile:  
*${userProfile}*

Course Catalog:  
*${courses}*

Recommendation Strategy:

1. **Academic Progression:**  
   Recommend courses that logically build upon completed courses, ensuring an appropriate academic trajectory. Suggest courses that fill any gaps in foundational knowledge or skills while considering long-term academic goals.

2. **Career Alignment:**  
   Match recommended courses with the student's short-term and long-term career aspirations, aligning with the student's evolving professional goals. Prioritize courses that develop key competencies for the student’s chosen career field, ensuring relevance in terms of industry demand and emerging trends. Take into account both current and future roles within the career path to offer a sustainable development plan.

3. **Skill Development and Interests:**  
   Focus on courses that will enhance the student’s strengths while addressing areas for improvement. Align with the student’s stated academic interests, ensuring engagement and passion for the learning journey. Recommend electives or niche areas of study that align with personal passions, encouraging intellectual curiosity.

Personalized Recommendation Format:

For each recommended course, provide the following detailed analysis:
1. **Rationale:**  
   Explain why the course is recommended, considering both academic progression and career alignment.

2. **Career Goals Connection:**  
   Detail how the course aligns with the student’s long-term career vision, and how it will enhance their potential to succeed in their chosen field.

3. **Challenges and Opportunities:**  
   Identify potential challenges (e.g., workload, prerequisite knowledge) and offer strategies to overcome them. Highlight opportunities for growth, skill development, and networking within the course.

4. **Expected Skill Gains:**  
   Describe the specific skills and competencies the student will gain from the course, focusing on tangible and measurable outcomes that will aid in career readiness.

5. **Alignment with Student Interests:**  
   Ensure that the course resonates with the student's personal academic and professional interests, fostering a sense of purpose and motivation in the learning process.

Constraints:
- Provide minimum of 2 course recommendations.
- Ensure diversity in course selection to expose the student to a wide array of skills, areas of knowledge, and academic experiences.

Additional Considerations:
- Take into account current academic standing and any areas of challenge that might benefit from extra support or foundational coursework.
- Factor in future career trends, such as emerging fields, technology advancements, and industry shifts, ensuring that recommended courses are forward-thinking.

---
  
  Give response in Markdowm
  
  `;
  }
  
  export default generateAdvancedRecommendationPrompt;