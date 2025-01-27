# BudgetBuddy: A Modern Budget Tracking Application

## Overview
BudgetBuddy is a modern budget tracking application designed to help users effectively manage their finances. The application allows users to track income, expenses, loans, and savings while providing real-time analytics and insights. Built with cutting-edge technologies, BudgetBuddy is scalable, user-friendly, and efficient.

## Features
- **User-Friendly Dashboard**: A central hub to monitor all financial data.
- **Income & Expense Tracking**: Add, categorize, and track transactions effortlessly.
- **Savings Goals**: Set and monitor savings targets.
- **Loan Management**: Track loan amounts, due dates, and repayment progress.
- **Real-Time Analytics**: Gain insights into spending habits and financial health.
- **Responsive Design**: Accessible on desktop and mobile devices.

## Tech Stack
### Frontend
- **Framework**: [Next.js](https://nextjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Libraries**: Radix UI, React Hook Form, Framer Motion

### Backend
- **Framework**: [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
- **Authentication**: JSON Web Tokens (JWT)
- **Additional Tools**: Prisma, Bcrypt

### Hosting/Deployment
- Deployment platform: *(Specify the platform, e.g., Vercel, AWS, Heroku)*

## Architecture
BudgetBuddy follows a client-server architecture to ensure scalability and maintainability:
- **Client**: Built with Next.js for a seamless user experience.
- **Server**: Node.js with Express.js to handle API requests.
- **Database**: MongoDB for efficient data storage and retrieval.

## Installation and Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/bini34/BudgetBuddy.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd BudgetBuddy
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
5. **Run the development server**:
   ```bash
   npm run dev
   ```
6. **Access the application**:
   Open your browser and navigate to `http://localhost:3000`.

## Development Report
### Successes
- Fully functional integration of frontend and backend.
- Scalable API designed with MongoDB and Mongoose.
- Interactive UI enhanced with Framer Motion animations.

### Challenges
- Debugging the authentication flow.
- Optimizing database queries for performance.
- Managing state in complex forms.

### Areas for Improvement
- Enhance error handling throughout the application.
- Add unit and integration tests for increased reliability.

## Lessons Learned
### Technical Skills
- Building secure APIs with JWT and Express Validator.
- Advanced state management and form validation techniques.
- Combining Next.js and Node.js in a full-stack architecture.

### Personal Growth
- Improved problem-solving skills.
- Effective time management when learning and using new tools.

## Future Enhancements
- Implement dark mode for improved user experience.
- Enhance mobile responsiveness.
- Add support for multiple user accounts.
- Optimize performance for handling large datasets.
- Streamline the user onboarding process.

## Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with a descriptive message.
4. Open a pull request and provide a detailed explanation of your changes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For questions or feedback, feel free to reach out:
- **Name**: Biniyam
- **Email**: biniyamambachew.com
- **LinkedIn**: [Biniyam](https://linkedin.com/in/biniyam)

---
Thank you for checking out BudgetBuddy! We hope it helps you take control of your finances.

