"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/hooks/use-toast"

type WishlistItem = {
  id: string
  word: string
  score: number
  mentions: number
  celebrity: string
  dateAdded: string
}

type WishlistContextType = {
  items: WishlistItem[]
  addItem: (item: Omit<WishlistItem, "id" | "dateAdded">) => void
  removeItem: (id: string) => void
  isInWishlist: (word: string) => boolean
  clearWishlist: () => void
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([])
  const { toast } = useToast()

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      try {
        setItems(JSON.parse(savedWishlist))
      } catch (error) {
        console.error("Failed to parse wishlist from localStorage:", error)
      }
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(items))
  }, [items])

  const addItem = (item: Omit<WishlistItem, "id" | "dateAdded">) => {
    // Check if item already exists
    if (items.some((i) => i.word === item.word)) {
      toast({
        title: "Already in wishlist",
        description: `"${item.word}" is already in your wishlist.`,
        variant: "destructive",
      })
      return
    }

    const newItem: WishlistItem = {
      ...item,
      id: crypto.randomUUID(),
      dateAdded: new Date().toISOString(),
    }

    setItems((prev) => [...prev, newItem])
    toast({
      title: "Added to wishlist",
      description: `"${item.word}" has been added to your wishlist.`,
    })
  }

  const removeItem = (id: string) => {
    const itemToRemove = items.find((item) => item.id === id)
    setItems((prev) => prev.filter((item) => item.id !== id))

    if (itemToRemove) {
      toast({
        title: "Removed from wishlist",
        description: `"${itemToRemove.word}" has been removed from your wishlist.`,
      })
    }
  }

  const isInWishlist = (word: string) => {
    return items.some((item) => item.word === word)
  }

  const clearWishlist = () => {
    setItems([])
    toast({
      title: "Wishlist cleared",
      description: "All items have been removed from your wishlist.",
    })
  }

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, isInWishlist, clearWishlist }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider")
  }
  return context
}

