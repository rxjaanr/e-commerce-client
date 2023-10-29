import mongoose from "mongoose";

enum Category {
  "Laptop" = "Laptop",
  "HP" = "HP",
  "Tablet" = "Tablet",
  "Keyboard" = "Keyboard",
}

// UNFINISHEDDDD!!!!!

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      minLength: [10, "Description Too Short"],
    },
    price: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: Category,
    },
    url: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: false,
    autoIndex: true,
  }
);

const Products =
  mongoose.models.product || mongoose.model("product", productSchema);

export default Products;
