"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"

export function DeleteAccount() {
  const [confirmText, setConfirmText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleDeleteAccount = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Account deleted",
        description: "Your account has been deleted successfully.",
      })
    }, 1000)
  }

  return (
    <Card className="border-destructive/50">
      <CardHeader className="text-destructive">
        <CardTitle>Delete Account</CardTitle>
        <CardDescription>Permanently delete your account and all of your data.</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </p>
      </CardContent>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account and remove your data from our
                servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="confirm">
                  Type <span className="font-semibold">delete my account</span> to confirm
                </Label>
                <Input
                  id="confirm"
                  value={confirmText}
                  onChange={(e) => setConfirmText(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleDeleteAccount}
                disabled={confirmText !== "delete my account" || isLoading}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isLoading ? "Deleting..." : "Delete Account"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}