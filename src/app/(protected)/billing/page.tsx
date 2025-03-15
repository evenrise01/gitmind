"use client";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { createCheckoutSession } from "@/lib/stripe";
import { api } from "@/trpc/react";
import { Info, CreditCard, DollarSign, Package } from "lucide-react";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

const BillingPage = () => {
  const { data: user, isLoading } = api.project.getMyCredits.useQuery();
  const [creditsToBuy, setCreditsToBuy] = useState<number[]>([100]);
  const [creditPresetSelected, setCreditPresetSelected] = useState<string | null>(null);
  
  const creditsToBuyAmount = creditsToBuy[0]!;
  const price = (creditsToBuyAmount / 50).toFixed(2); //50 represents how much credits in 1 dollar
  
  const creditPresets = [
    { value: 50, label: "Small" },
    { value: 100, label: "Regular" },
    { value: 250, label: "Medium" },
    { value: 500, label: "Large" },
  ];

  const handlePresetSelection = (value: number) => {
    setCreditsToBuy([value]);
    setCreditPresetSelected(value.toString());
    toast.success(`Selected ${value} credits package`);
  };

  const handleCheckout = () => {
    toast.promise(
      // This function should return a promise, createCheckoutSession might already return one
      async () => {
        await createCheckoutSession(creditsToBuyAmount);
        return true;
      },
      {
        loading: 'Preparing checkout session...',
        success: `Redirecting to payment for ${creditsToBuyAmount} credits`,
        error: 'Failed to create checkout session'
      }
    );
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <h1 className="text-2xl font-bold">Billing</h1>
        {!isLoading && user && (
          <Badge variant="outline" className="mt-2 md:mt-0 px-3 py-1 bg-primary/10 text-primary">
            <DollarSign className="size-4 mr-1" />
            <span className="font-medium">{user.credits} credits available</span>
          </Badge>
        )}
        {isLoading && (
          <Skeleton className="h-8 w-40" />
        )}
      </div>

      <Card className="mb-6 border border-border">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <Info className="size-4 mr-2 text-primary" />
            How credits work
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Credits are used to index files in your repositories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md bg-primary/5 px-4 py-3 border border-primary/20">
            <p className="text-sm">
              Each credit allows you to index 1 file in a repository.
            </p>
            <p className="text-sm mt-1">
              E.g. If your project has 100 files, you will require 100 credits to
              index it.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Purchase Credits</CardTitle>
          <CardDescription>
            Select the amount of credits you want to purchase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="slider" className="w-full">
            <TabsList className="mb-4 grid grid-cols-2">
              <TabsTrigger value="slider">Custom Amount</TabsTrigger>
              <TabsTrigger value="presets">Quick Select</TabsTrigger>
            </TabsList>
            
            <TabsContent value="slider" className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">{creditsToBuyAmount} credits</span>
                <span className="text-sm font-medium">${price}</span>
              </div>
              
              <Slider
                defaultValue={[100]}
                max={1000}
                min={10}
                step={10}
                onValueChange={(value) => {
                  setCreditsToBuy(value);
                  setCreditPresetSelected(null);
                  
                  // Only toast if the value has changed significantly to avoid too many notifications
                  if (Math.abs(value[0]! - creditsToBuy[0]!) >= 50) {
                    toast(`Selected ${value[0]} credits`);
                  }
                }}
                value={creditsToBuy}
                className="py-4"
              />
              
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>10 credits</span>
                <span>1000 credits</span>
              </div>
            </TabsContent>
            
            <TabsContent value="presets" className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {creditPresets.map((preset) => (
                  <Button
                    key={preset.value}
                    variant={creditPresetSelected === preset.value.toString() ? "default" : "outline"}
                    className="h-24 flex flex-col gap-1"
                    onClick={() => handlePresetSelection(preset.value)}
                  >
                    <Package className="size-4 mb-1" />
                    <span className="font-bold">{preset.value} credits</span>
                    <span className="text-xs">${(preset.value / 50).toFixed(2)}</span>
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="mt-6">
            <Button 
              onClick={handleCheckout}
              className="w-full md:w-auto"
              size="lg"
            >
              <CreditCard className="size-4 mr-2" />
              Buy {creditsToBuyAmount} credits for ${price}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BillingPage;