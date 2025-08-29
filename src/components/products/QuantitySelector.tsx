
"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
    quantity: number;
    setQuantity: (quantity: number) => void;
}

export function QuantitySelector({ quantity, setQuantity }: QuantitySelectorProps) {
    const handleDecrement = () => {
        setQuantity(Math.max(1, quantity - 1));
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        if (!isNaN(value) && value > 0) {
            setQuantity(value);
        } else if (e.target.value === '') {
            // Allow clearing the input, default to 1 if blurred empty
        }
    };
    
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value === '') {
            setQuantity(1);
        }
    }

    return (
        <div className="flex-grow grid gap-2">
            <Label htmlFor="quantity" className="sr-only">Quantité</Label>
            <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" className="h-11 w-11" onClick={handleDecrement}>
                    <Minus className="h-4 w-4" />
                </Button>
                <Input
                    id="quantity"
                    type="number"
                    value={quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    min="1"
                    className="w-20 h-11 text-center text-lg font-bold"
                />
                <Button variant="outline" size="icon" className="h-11 w-11" onClick={handleIncrement}>
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}
