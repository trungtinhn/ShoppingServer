const express = require("express")
const socketSetup = require("./socket");
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cokieParser = require("cookie-parser")
const app = express();
const http = require("http");
const server = http.createServer(app);

const categoryRoutes = require("./routes/routeCategory")
const productRoutes = require('./routes/routeProduct');
const reviewRoutes = require("./routes/routeReview");
const promotionRoutes = require("./routes/routePromotion");
const addressRoutes = require("./routes/routeAddress");
const userRoutes = require("./routes/routeUser");
const cartRoutes = require("./routes/routeCart");
const parameterRoutes = require("./routes/routesParameter");
const likeRoutes = require("./routes/routesLike");
const orderRoutes = require("./routes/routesOrder");
const paymentRoutes = require("./routes/routePayment");
const permissionRoutes = require("./routes/routePermission");
const knnRoutes = require('./routes/routeKnn');
const messageRoutes = require('./routes/routeMessage');
dotenv.config()
mongoose.connect(process.env.MONGODB_URL.replace("<password>", process.env.MONGODB_PASSWORD)).then(() => {
    console.log("Database connected");
})


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ limit: "10mb", extended: true }));
app.use(cokieParser())

app.get("/", (req, res) =>
    res.status(200).json("Welcome server")
  );

app.use("/api/category", categoryRoutes)
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/promotion', promotionRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/user', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/parameter', parameterRoutes);
app.use('/api/like', likeRoutes);
app.use('/api/order', orderRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/knn', knnRoutes);
app.use('/api/messages', messageRoutes);

socketSetup(server);
server.listen(8000, () => {
    console.log("Server running on port 8000");
});
    



