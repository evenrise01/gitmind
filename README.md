# 🧠 GitMind – Developer Intelligence for Teams

[![Visit Live App](https://img.shields.io/badge/Live%20Demo-Visit%20Now-brightgreen?style=for-the-badge&logo=vercel)](https://gitmind.vercel.app/)
[![GitHub issues](https://img.shields.io/github/issues/evenrise01/gitmind?style=for-the-badge)](https://github.com/evenrise01/gitmind/issues)
[![GitHub forks](https://img.shields.io/github/forks/evenrise01/gitmind?style=for-the-badge)](https://github.com/evenrise01/gitmind/network)
[![GitHub stars](https://img.shields.io/github/stars/evenrise01/gitmind?style=for-the-badge)](https://github.com/evenrise01/gitmind/stargazers)

**GitMind empowers development teams with instant insights into GitHub repositories and meeting discussions. Designed to streamline onboarding, enhance productivity, and improve team alignment, GitMind delivers features that address real-world workflow gaps with intelligence and speed.**

---

## ✨ Key Features

GitMind offers a suite of tools to boost your team's understanding and efficiency:

* 📈 **Codebase Insights:**
    * Analyze GitHub commit history to surface smart summaries.
    * Identify patterns in code evolution and development trends.
* 📚 **Living Q&A Reference:**
    * Build a searchable knowledge base of questions and answers specific to your codebase.
    * Ideal for onboarding new developers and tracking architectural decisions.
* 🎙️ **Meeting Intelligence:**
    * Automatically transcribe team meeting audio.
    * Generate concise summaries for easy reference, ensuring alignment and knowledge retention.

---

## 🛠️ Tech Stack

This project leverages a modern and robust technology stack:

| Category      | Technology                                                     | Description                                   |
|---------------|----------------------------------------------------------------|-----------------------------------------------|
| **Frontend** | ![Next.js](https://cdn.simpleicons.org/nextdotjs/000000) Next.js | React framework for SSR, SSG, and routing     |
|               | ![React](https://cdn.simpleicons.org/react/61DAFB) React         | Core UI library for building components       |
|               | ![TypeScript](https://cdn.simpleicons.org/typescript/3178C6) TypeScript | Typed JavaScript for enhanced reliability   |
|               | ![Tailwind CSS](https://cdn.simpleicons.org/tailwindcss/06B6D4) Tailwind CSS | Utility-first CSS framework for rapid UI      |
|               | ![Framer Motion](https://cdn.simpleicons.org/framer/0055FF) Framer Motion | Animation library for fluid user experiences  |
| **Backend & DB**| ![PostgreSQL](https://cdn.simpleicons.org/postgresql/4169E1) PostgreSQL | Robust relational database for data persistence |
|               | ![Prisma](https://cdn.simpleicons.org/prisma/2D3748) Prisma ORM   | Type-safe database client and ORM             |
| **AI & Services**| ![Google Gemini](https://cdn.simpleicons.org/googlegemini/4285F4) Gemini AI | LLM for meeting summarization and Q&A features|
| **Auth** | ![Clerk](https://cdn.simpleicons.org/clerk/6C47FF) Clerk         | User authentication and session management    |
| **Payments** | ![Stripe](https://cdn.simpleicons.org/stripe/626CD9) Stripe       | Payment processing (if/when applicable)     |

*(Icon colors are illustrative and may differ slightly based on SimpleIcons updates)*

---

## 🚀 Getting Started

Follow these steps to set up GitMind locally for development and testing.

### Prerequisites

* [Node.js](https://nodejs.org/) (v18.x or later recommended)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
* [Git](https://git-scm.com/)
* Access to a PostgreSQL database instance.

### Installation & Setup

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/evenrise01/gitmind.git](https://github.com/evenrise01/gitmind.git)
    cd gitmind
    ```

2.  **Install Dependencies:**
    Choose your preferred package manager:
    ```bash
    npm install
    # OR
    yarn install
    ```

3.  **Set Up Environment Variables:**
    Create a `.env` file in the root directory of the project. Copy the contents of `.env.example` (if provided, otherwise create from scratch) and fill in the necessary API keys and configuration details.
    ```env
    # Example .env variables (update with your actual keys)
    DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"

    # Gemini AI API Key
    GEMINI_API_KEY="YOUR_GEMINI_API_KEY"

    # Clerk Authentication Keys
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="YOUR_CLERK_PUBLISHABLE_KEY"
    CLERK_SECRET_KEY="YOUR_CLERK_SECRET_KEY"

    NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
    NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"

    # Stripe API Keys (if you are using payments)
    STRIPE_SECRET_KEY="YOUR_STRIPE_SECRET_KEY"
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="YOUR_STRIPE_PUBLISHABLE_KEY"
    STRIPE_WEBHOOK_SECRET="YOUR_STRIPE_WEBHOOK_SECRET" # Optional: for local webhook testing

    # Other necessary variables
    # e.g., NEXT_PUBLIC_APP_URL="http://localhost:3000"
    ```
    **Note:** Ensure your PostgreSQL database is running and accessible with the credentials provided in `DATABASE_URL`. You may also need to run Prisma migrations:
    ```bash
    npx prisma migrate dev
    # Optional: Seed database if you have seed scripts
    # npx prisma db seed
    ```

4.  **Start the Development Server:**
    ```bash
    npm run dev
    # OR
    yarn run dev
    ```
    The application should now be accessible at [http://localhost:3000](http://localhost:3000).

---

## 🌐 Live Demo

Experience GitMind in action:
👉 **[Visit Live App](https://gitmind.vercel.app/)**

---

## 🤝 Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

### How to Contribute

1.  **Fork the Project:** Click the 'Fork' button at the top right of this page.
2.  **Create your Feature Branch:**
    ```bash
    git checkout -b feature/AmazingFeature
    ```
3.  **Commit your Changes:** Write clear, concise commit messages.
    ```bash
    git commit -m 'Add some AmazingFeature'
    ```
4.  **Push to the Branch:**
    ```bash
    git push origin feature/AmazingFeature
    ```
5.  **Open a Pull Request:** Go to your fork on GitHub and click the 'New pull request' button.

Please ensure your PR describes the problem and solution. Include screenshots or GIFs if it's a UI change.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` file for more information.

---

## 📧 Contact

Your Name / Project Link – Daksh Singh

Project Link: [https://github.com/evenrise01/gitmind](https://github.com/evenrise01/gitmind)

---

## 🙏 Acknowledgements

* Elliott Chong - Dionysis Project Tutorial on Youtube
