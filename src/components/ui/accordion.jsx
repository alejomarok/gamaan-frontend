"use client"

import React from "react"
import { cn } from "../../lib/utils"
import { ChevronDown } from "lucide-react"

const Accordion = ({ type = "single", collapsible = false, className, children, ...props }) => {
  const [openItems, setOpenItems] = React.useState(new Set())

  const handleItemClick = (value) => {
    if (type === "single") {
      if (collapsible && openItems.has(value)) {
        setOpenItems(new Set())
      } else {
        setOpenItems(new Set([value]))
      }
    } else {
      const newOpenItems = new Set(openItems)
      if (newOpenItems.has(value)) {
        newOpenItems.delete(value)
      } else {
        newOpenItems.add(value)
      }
      setOpenItems(newOpenItems)
    }
  }

  const contextValue = {
    openItems,
    handleItemClick,
  }

  return (
    <div className={cn("space-y-1", className)} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { context: contextValue })
        }
        return child
      })}
    </div>
  )
}

const AccordionItem = ({ value, className, context, children, ...props }) => {
  const isOpen = context?.openItems.has(value)

  return (
    <div
      className={cn("border-b", className)}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            value,
            isOpen,
            onToggle: () => context?.handleItemClick(value),
            key: `${value}-${child.type.displayName || child.type.name}` // <- Esto fuerza render
          })
        }
        return child
      })}
    </div>
  )
}


const AccordionTrigger = ({ className, children, isOpen, onToggle, ...props }) => {
  return (
    <div
      className={cn(
        "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      onClick={onToggle}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </div>
  )
}

const AccordionContent = ({ className, children, isOpen, ...props }) => {
  return (
    <div
      className={cn(
        "overflow-hidden text-sm transition-all duration-300",
        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        className
      )}
      data-state={isOpen ? "open" : "closed"}
      {...props}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  )
}


export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
