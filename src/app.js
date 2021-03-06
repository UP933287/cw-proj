import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import sequelize from './database/database.js';
import AuthRoutes from './routes/auth-routes.js';
import APIRoutes from './routes/api-routes.js';

// Constants
const PORT = process.env.SERVER_PORT ?? 8081;
const DIRNAME = process.env.PWD;
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static(path.join(DIRNAME, 'client', 'build')));

// Routes
app.use(AuthRoutes);
app.use(APIRoutes);
app.get('*', (req, res) => {
    res.sendFile(path.join(DIRNAME, 'client', 'build', 'index.html'));
});

// Initialisation
(async () => {
    try {
        await sequelize.sync({
            // Force reset the database schema:
            // force: true,
            // ^ Uncomment whenever you update the schema
            // eg. when creating a new model, updating an old one.
        });
        app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
    } catch (err) {
        // throw new Error(err);
    }
})();
