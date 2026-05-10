import React from 'react'
import ChangePasswordForm from './ChangePasswordForm'

const ChangePasswordSection = async () => {
  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold">Change Password</h2>
      <ChangePasswordForm/>      
    </section>
  )
}

export default ChangePasswordSection