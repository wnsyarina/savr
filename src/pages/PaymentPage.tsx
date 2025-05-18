
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, WalletCards } from 'lucide-react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const paymentFormSchema = z.object({
  cardName: z.string().min(3, { message: "Name must be at least 3 characters" }),
  cardNumber: z.string().regex(/^\d{16}$/, { message: "Card number must be 16 digits" }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, { message: "Use MM/YY format" }),
  cvv: z.string().regex(/^\d{3,4}$/, { message: "CVV must be 3 or 4 digits" })
});

type PaymentFormValues = z.infer<typeof paymentFormSchema>;

const PaymentPage: React.FC = () => {
  const navigate = useNavigate();
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardName: '',
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    }
  });

  const onSubmit = (values: PaymentFormValues) => {
    // In a real app, this would process the payment
    console.log('Payment submitted:', values);
    
    // Show processing toast
    toast.promise(
      new Promise((resolve) => setTimeout(resolve, 2000)), // Simulate processing
      {
        loading: 'Processing payment...',
        success: () => {
          setTimeout(() => navigate('/orders'), 1000);
          return 'Payment successful! Redirecting to orders...';
        },
        error: 'Payment failed. Please try again.'
      }
    );
  };

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, '').substring(0, 16);
    return digits;
  };

  const formatExpiryDate = (value: string) => {
    const digits = value.replace(/\D/g, '');
    if (digits.length > 2) {
      return `${digits.substring(0, 2)}/${digits.substring(2, 4)}`;
    }
    return digits;
  };

  return (
    <div className="app-container pb-20">
      <Header title="Payment" showBackButton />
      
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-center">Complete Your Purchase</h2>
          <p className="text-neutralGray text-center text-sm">Enter your payment details below</p>
        </div>
        
        <div className="bg-orange/10 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Amount:</span>
            <span className="font-bold text-xl text-orange">$12.99</span>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-orange" />
              <CardTitle>Payment Method</CardTitle>
            </div>
            <CardDescription>Enter your card details to complete the purchase</CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="cardName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cardholder Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cardNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Card Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="1234 5678 9012 3456"
                          type="text"
                          inputMode="numeric"
                          value={field.value}
                          onChange={(e) => field.onChange(formatCardNumber(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Expiry Date</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="MM/YY"
                            value={field.value}
                            onChange={(e) => field.onChange(formatExpiryDate(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cvv"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>CVV</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="123" 
                            type="text"
                            inputMode="numeric"
                            maxLength={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full bg-orange">
                  <WalletCards className="h-4 w-4 mr-2" />
                  Pay Now
                </Button>
              </form>
            </Form>
          </CardContent>
          
          <CardFooter className="flex flex-col items-center text-xs text-neutralGray">
            <div className="flex items-center gap-2 mb-2">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 1.5C6.201 1.5 1.5 6.201 1.5 12C1.5 17.799 6.201 22.5 12 22.5C17.799 22.5 22.5 17.799 22.5 12C22.5 6.201 17.799 1.5 12 1.5ZM9.677 7.197C10.091 6.458 10.871 6 11.724 6H12.276C13.129 6 13.909 6.458 14.323 7.197L14.927 8.25H16.5C17.743 8.25 18.75 9.257 18.75 10.5V16.5C18.75 17.743 17.743 18.75 16.5 18.75H7.5C6.257 18.75 5.25 17.743 5.25 16.5V10.5C5.25 9.257 6.257 8.25 7.5 8.25H9.073L9.677 7.197ZM9.75 12.75C9.75 13.992 10.757 15 12 15C13.243 15 14.25 13.992 14.25 12.75C14.25 11.508 13.243 10.5 12 10.5C10.757 10.5 9.75 11.508 9.75 12.75Z" fill="currentColor" />
              </svg>
              <span>Your payment details are secure</span>
            </div>
            <p className="text-center">We use secure transmission and encrypted storage</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PaymentPage;
