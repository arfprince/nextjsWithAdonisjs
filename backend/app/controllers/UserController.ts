// import type { HttpContext } from '@adonisjs/core/http'

// export default class UsersController {
//   /**
//    * Display a list of resource
//    */
//   async index({}: HttpContext) {}

//   /**
//    * Display form to create a new record
//    */
//   async create({}: HttpContext) {}

//   /**
//    * Handle form submission for the create action
//    */
//   async store({ request }: HttpContext) {}

//   /**
//    * Show individual record
//    */
//   async show({ params }: HttpContext) {}

//   /**
//    * Edit individual record
//    */
//   async edit({ params }: HttpContext) {}

//   /**
//    * Handle form submission for the edit action
//    */
//   async update({ params, request }: HttpContext) {}

//   /**
//    * Delete record
//    */
//   async destroy({ params }: HttpContext) {}
// }

import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'


export default class UserController {
  
  /**
   * Display a list of all users
   */
  public async index({ response }: HttpContext) {
    const users = await User.all()
    return response.json(users)
  }

  /**
   * Display form to create a new user (optional for API)
   */
  // public async create({}: HttpContext) {
  //   // Normally not needed for APIs, but if you want to render a form for UI
  //   // You can render a page or something like that
  // }

  /**
   * Handle form submission to create a new user
   */
  public async store({ request, response }: HttpContext) {
    const userData = request.only(['fullName', 'email', 'password'])

    try {
      const user = await User.create(userData)
      return response.status(201).json(user)
    } catch (error) {
      return response.status(500).json({ message: 'Error creating user', error })
    }
  }

  /**
   * Show an individual user record
   */
  public async show({ params, response }: HttpContext) {
    const user = await User.find(params.id)

    if (!user) {
      return response.status(404).json({ message: 'User not found' })
    }

    return response.json(user)
  }

  /**
   * Edit individual user (optional for API)
   */
  // public async edit({ params }: HttpContext) {
  //   // Not needed for APIs, typically used for rendering HTML forms
  // }

  /**
   * Handle form submission to update an individual user
   */
  public async update({ params, request, response }: HttpContext) {
    const user = await User.find(params.id)

    if (!user) {
      return response.status(404).json({ message: 'User not found' })
    }

    const updatedData = request.only(['fullName', 'email', 'password'])
    user.merge(updatedData)
    await user.save()

    return response.json(user)
  }

  /**
   * Delete a user record
   */
  public async destroy({ params, response }: HttpContext) {
    const user = await User.find(params.id)

    if (!user) {
      return response.status(404).json({ message: 'User not found' })
    }

    await user.delete()
    return response.status(204).send(null)
  }
}
