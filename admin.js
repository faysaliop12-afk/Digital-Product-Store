export const products = [
  {
    id: "ebook-001",
    title: "Digital Success Ebook",
    description: "A practical downloadable digital guide.",
    price: 4.99,
    category: "Ebooks"
  },
  {
    id: "template-001",
    title: "Premium Social Media Templates",
    description: "Creative templates for digital creators.",
    price: 7.99,
    category: "Templates"
  },
  {
    id: "prompts-001",
    title: "AI Prompt Bundle",
    description: "Prompts for writing and creative workflows.",
    price: 5.99,
    category: "AI Prompts"
  },
  {
    id: "graphics-001",
    title: "PNG Graphics Bundle",
    description: "Digital artwork files for personal projects.",
    price: 6.99,
    category: "Graphics"
  }
];

export default function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "GET") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const token = process.env.ADMIN_TOKEN;

  if (
    !token ||
    req.headers.authorization !== `Bearer ${token}`
  ) {
    return res.status(401).json({
      error: "Unauthorized"
    });
  }

  return res.status(200).json({
    message: "Admin API connected",
    products
  });
      }
