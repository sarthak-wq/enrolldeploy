import studentRouter from "./student-router.js";
import authRouter from "./auth-router.js";
import adminRouter from "./admin-router.js";
import facultyRouter from "./faculty-router.js";
import chatbotRouter from "./chatbot-router.js";
import courseRouter from "./course-routes.js";
import userRouter from "./user-router.js";


const initializeRoutes = (app) => {
    app.use('/user/enroll', studentRouter);
    app.use('/user', userRouter);
    app.use('/auth', authRouter);
    app.use('/user/coursesTaught', facultyRouter);
    app.use('/admin', adminRouter);
    app.use('/chat', chatbotRouter);
    app.use('/logout', authRouter )
    app.use('/courses', courseRouter);
    app.use('/', userRouter);
}

export default initializeRoutes;