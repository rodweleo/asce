import {
    IconTruckDelivery,
    IconReceiptBitcoin,
    IconDeviceAnalytics,
    IconMessageChatbot,
    IconWorldUpload,
    IconBasketCog
} from "@tabler/icons-react";

export const FEATURES = [
    { title: "Inventory Management", description: "Real-time tracking and automated reordering of inventory.", icon: <IconBasketCog /> },
    { title: "Supplier Coordination", description: "Streamline communication and order processing", icon: <IconTruckDelivery /> },
    { title: "Invoicing & Payments", description: "Generate invoices and process payments seamlessly", icon: <IconReceiptBitcoin /> },
    { title: "Customer Engagement", description: "AI-powered chatbots for 24/7 support and business advisory", icon: <IconMessageChatbot /> },
    { title: "Digital Marketing", description: "Integrated social media campaign management", icon: <IconWorldUpload /> },
    { title: "Analytics & Reporting", description: "Comprehensive insights for informed decisions", icon: <IconDeviceAnalytics /> },
]