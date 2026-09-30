"use client";

import { useState } from "react";
import { BagIcon, HeartIcon } from "@/components/icons";
import { stockState, totalStock, type Product, type StockState } from "@/lib/products";

const stockCopy: Record<StockState, (qty: number) => string> = {
  in_stock: () => "In stock",
  low_stock: (qty) => `Only ${qty} left`,
  sold_out: () => "Sold out",
};

const stockDot: Record<StockState, string> = {
  in_stock: "bg-success",
  low_stock: "bg-danger",
  sold_out: "bg-muted",
};

// Cart and wishlist aren't wired to a backend yet; both confirm locally.
export function ProductPurchase({ product }: { product: Product }) {
  const sized = product.sizes.length > 1;
  const [size, setSize] = useState<string | null>(sized ? null : product.sizes[0].label);
  const [sizeMissing, setSizeMissing] = useState(false);
  const [added, setAdded] = useState(false);
  const [saved, setSaved] = useState(false);

  const selected = product.sizes.find((s) => s.label === size);
  // Before a size is picked, report on the product as a whole
  const quantity = selected ? selected.stock : totalStock(product);
  const state = stockState(quantity);
  const soldOut = totalStock(product) === 0;

  const addToBag = () => {
    if (!selected) {
      setSizeMissing(true);
      return;
    }
    setAdded(true);
  };

  return (
    <div className="flex flex-col gap-6">
      {sized && (
        <fieldset>
          <div className="mb-3 flex items-baseline justify-between">
            <legend className="text-label">
              Size{size && <span className="ml-2 font-medium normal-case text-muted">{size}</span>}
            </legend>
            <button type="button" className="btn btn-text">
              Size guide
            </button>
          </div>
          <div
            role="radiogroup"
            aria-label="Size"
            aria-invalid={sizeMissing || undefined}
            className="grid grid-cols-5 gap-2 sm:grid-cols-6 lg:grid-cols-5 xl:grid-cols-6"
          >
            {product.sizes.map((option) => {
              const unavailable = option.stock === 0;
              const checked = option.label === size;
              return (
                <button
                  key={option.label}
                  type="button"
                  role="radio"
                  aria-checked={checked}
                  disabled={unavailable}
                  onClick={() => {
                    setSize(option.label);
                    setSizeMissing(false);
                    setAdded(false);
                  }}
                  className={`h-12 border text-xs font-medium transition-colors ${
                    checked
                      ? "border-foreground bg-foreground text-background"
                      : "border-line hover:border-foreground"
                  } disabled:border-line disabled:text-disabled disabled:line-through disabled:hover:border-line`}
                >
                  {option.label}
                  {unavailable && <span className="sr-only"> (sold out)</span>}
                </button>
              );
            })}
          </div>
          {sizeMissing && (
            <p role="alert" className="mt-3 text-caption text-danger">
              Please select a size.
            </p>
          )}
        </fieldset>
      )}

      <p className="flex items-center gap-2 text-caption">
        <span aria-hidden="true" className={`size-1.5 rounded-full ${stockDot[state]}`} />
        {stockCopy[state](quantity)}
        {sized && !selected && !soldOut && (
          <span className="text-muted">· Select a size to check availability</span>
        )}
      </p>

      <div className="flex gap-2">
        <button
          type="button"
          className="btn btn-primary flex-1"
          disabled={soldOut}
          onClick={addToBag}
        >
          {!soldOut && <BagIcon />}
          {soldOut ? "Sold out" : "Add to bag"}
        </button>
        <button
          type="button"
          className="btn btn-secondary px-4"
          aria-pressed={saved}
          onClick={() => setSaved((value) => !value)}
        >
          <HeartIcon className={saved ? "fill-current" : undefined} />
          <span className="sr-only">{saved ? "Remove from saved items" : "Save item"}</span>
        </button>
      </div>

      <p role="status" className="text-caption empty:hidden">
        {added && selected
          ? `Added to your bag${sized ? ` in size ${selected.label}` : ""}.`
          : ""}
      </p>
    </div>
  );
}
