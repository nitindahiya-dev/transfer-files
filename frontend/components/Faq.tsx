import React from "react";
import {
Accordion,
AccordionContent,
AccordionItem,
AccordionTrigger,
} from "@/components/ui/accordion"
const Faq = () => {
  return (
    <div className='max-w-6xl mx-auto text-center min-h-[500px]'>
      <h2 className='text-4xl font-extrabold mb-10'>Frequently Asked Questions</h2>
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger className="text-md hover:no-underline">What is the maximum file size I can upload?</AccordionTrigger>
        <AccordionContent className="text-md text-left">
        The maximum file size you can upload depends on the plan you choose. For free users, the limit is typically X GB, while premium users can transfer files up to Y GB in size.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger className="text-md hover:no-underline">Are my files secure during transfer?</AccordionTrigger>
        <AccordionContent className="text-md text-left">
        Yes, your files are protected with end-to-end encryption. We use industry-standard encryption protocols to ensure your data is safe during transfer and while stored on our servers.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger className="text-md hover:no-underline">How long will my files be available for download?</AccordionTrigger>
        <AccordionContent className="text-md text-left">
        Files are available for download for [X days] after upload. After that period, the files are automatically deleted from our servers to maintain security and privacy.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger className="text-md hover:no-underline">Do I need to create an account to send or receive files?</AccordionTrigger>
        <AccordionContent className="text-md text-left">
        No, you don’t need to create an account to transfer files. However, having an account allows you to track transfers, set custom expiration times, and access other premium features.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger className="text-md hover:no-underline">Can I transfer files to multiple recipients at once?</AccordionTrigger>
        <AccordionContent className="text-md text-left">
        Yes, you can share your file with multiple recipients by entering their email addresses or by generating a shareable link that can be distributed to multiple people.
        </AccordionContent>
      </AccordionItem>
    </Accordion>

    </div>
  );
}

export default Faq;
