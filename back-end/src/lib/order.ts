import { Order } from "../Order";

jest.mock("./Order", () => ({
    __esModule: true,
    Order: {
        createOrder: jest.fn().mockImplementation((articlesInOrder: { articleId: string; quantity: number }[]) => {
            return Promise.resolve({ id: "mocked_order_id", articlesInOrder });
        }),
    },
}));

describe("Mock createOrder method", () => {
    it("should create a new order with mock data", async () => {
        const articlesInOrder = [
            { articleId: "article_id_1", quantity: 2 },
            { articleId: "article_id_2", quantity: 1 },
        ];

        const newOrder = await Order.createOrder(articlesInOrder);

        expect(Order.createOrder).toHaveBeenCalledWith(articlesInOrder);

        expect(newOrder).toEqual({ id: "mocked_order_id", articlesInOrder });
    });
});
