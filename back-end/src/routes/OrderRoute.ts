import express, { Request, Response } from "express";
import { Order } from "../Order";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const orderDetails = await Order.getOrderDetails(orderId);
        res.json(orderDetails);
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/stats", async (req: Request, res: Response) => {
    try {
        const orderStats = await Order.getOrderStats();
        res.json(orderStats);
    } catch (error) {
        console.error("Error fetching monthly order stats:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const order = await Order.findOneOrFail({ where: { id: orderId }, relations: ["articlesInOrder"] });
        await order.deleteOrder();
        res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ message: "Failed to delete order" });
    }
});

router.put("/orders/:id", async (req: Request, res: Response) => {
    try {
        const orderId = req.params.id;
        const updates = req.body;

        const updatedOrder = await Order.updateOrder(orderId, updates);
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error("Error updating order:", error);
        res.status(500).json({ message: "Failed to update order" });
    }
});



export default router;
