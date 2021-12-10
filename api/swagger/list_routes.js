/**
 * @swagger
 * /api/list:
 *   post:
 *     summary: Get all user's shopping lists
 *     description: Get all user's shopping lists
 *     parameters:
 *       - in: cookie
 *         name: Authorization
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: json answer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: status of the operation
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 61b258d7f8b20053f705d74d
 *                       name:
 *                         type: string
 *                         example: List for evening
 *                       user_id:
 *                         type: string
 *                         example: 61b258d7f8b20053f705d74d
 *                       assigned_id:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: 61b258d7f8b20053f705d74d
 *                       items:
 *                         type: array
 *                         items:
 *                           type: string
 *                           example: 61b258d7f8b20053f705d74d
 *                       finished:
 *                         type: boolean
 *                         example: false
 *                         delete: false
 *       400:
 *         description: wrong requestbody params or other mistakes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: status of the response
 *                   example: false
 *                 error_message:
 *                   type: string
 *                   description: message explaining what went wrong
 *                   example: Что-то пошло не так, не удалось добавить
 *       404:
 *         description: missing authorization token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: status of the response
 *                   example: 404
 *                 error_message:
 *                   type: string
 *                   description: message explaining what went wrong
 *                   example: Не удалось найти токен авторизации. Авторизуйтесь повторно
 */

/**
 * @swagger
 * /api/list/getById:
 *   post:
 *     summary: Get list details
 *     description: Get list details
 *     parameters:
 *       - in: cookie
 *         name: Authorization
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 61b258d7f8b20053f705d74d
 *     responses:
 *       200:
 *         description: json answer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: status of the operation
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: list data
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 61b258d7f8b20053f705d74d
 *                     name:
 *                       type: string
 *                       example: List for evening
 *                     user_id:
 *                       type: string
 *                       example: 61b258d7f8b20053f705d74d
 *                     assigned_id:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: 61b258d7f8b20053f705d74d
 *                     items:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: 61b258d7f8b20053f705d74d
 *                     finished:
 *                       type: boolean
 *                       example: false
 *                       delete: false
 *       400:
 *         description: wrong requestbody params or other mistakes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: status of the response
 *                   example: false
 *                 error_message:
 *                   type: string
 *                   description: message explaining what went wrong
 *                   example: Что-то пошло не так, не удалось добавить
 *       404:
 *         description: missing authorization token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: status of the response
 *                   example: 404
 *                 error_message:
 *                   type: string
 *                   description: message explaining what went wrong
 *                   example: Не удалось найти токен авторизации. Авторизуйтесь повторно
 */

/**
 * @swagger
 * /api/list:
 *   put:
 *     summary: create list
 *     description: create list
 *     parameters:
 *       - in: cookie
 *         name: Authorization
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: New shopping list
 *     responses:
 *       200:
 *         description: json answer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: status of the operation
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: list data
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 61b258d7f8b20053f705d74d
 *                     name:
 *                       type: string
 *                       example: List for evening
 *                     user_id:
 *                       type: string
 *                       example: 61b258d7f8b20053f705d74d
 *                     assigned_id:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: 61b258d7f8b20053f705d74d
 *                     items:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: 61b258d7f8b20053f705d74d
 *                     finished:
 *                       type: boolean
 *                       example: false
 *                       delete: false
 *       400:
 *         description: wrong requestbody params or other mistakes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: status of the response
 *                   example: false
 *                 error_message:
 *                   type: string
 *                   description: message explaining what went wrong
 *                   example: Что-то пошло не так, не удалось добавить
 *       404:
 *         description: missing authorization token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: status of the response
 *                   example: 404
 *                 error_message:
 *                   type: string
 *                   description: message explaining what went wrong
 *                   example: Не удалось найти токен авторизации. Авторизуйтесь повторно
 */

/**
 * @swagger
 * /api/list/update:
 *   patch:
 *     summary: update list
 *     description: update list
 *     parameters:
 *       - in: cookie
 *         name: Authorization
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 61b258d7f8b20053f705d74d
 *                     required: true
 *                   name:
 *                     type: string
 *                     example: New shopping list
 *                     required: false
 *                   items:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: 61b258d7f8b20053f705d74d
 *                     required: false
 *                   assigned_id:
 *                     type: array
 *                     items:
 *                       type: string
 *                       example: New shopping list
 *                     required: false
 *                   finished:
 *                     type: boolean
 *                     example: true
 *                     required: false
 *     responses:
 *       200:
 *         description: json answer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: status of the operation
 *                   example: true
 *                 data:
 *                   type: object
 *                   description: list data
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 61b258d7f8b20053f705d74d
 *                     name:
 *                       type: string
 *                       example: List for evening
 *                     user_id:
 *                       type: string
 *                       example: 61b258d7f8b20053f705d74d
 *                     assigned_id:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: 61b258d7f8b20053f705d74d
 *                     items:
 *                       type: array
 *                       items:
 *                         type: string
 *                         example: 61b258d7f8b20053f705d74d
 *                     finished:
 *                       type: boolean
 *                       example: false
 *                       delete: false
 *       400:
 *         description: wrong requestbody params or other mistakes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: status of the response
 *                   example: false
 *                 error_message:
 *                   type: string
 *                   description: message explaining what went wrong
 *                   example: Что-то пошло не так, не удалось добавить
 *       404:
 *         description: missing authorization token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: status of the response
 *                   example: 404
 *                 error_message:
 *                   type: string
 *                   description: message explaining what went wrong
 *                   example: Не удалось найти токен авторизации. Авторизуйтесь повторно
 */

/**
 * @swagger
 * /api/list:
 *   delete:
 *     summary: update list
 *     description: update list
 *     parameters:
 *       - in: cookie
 *         name: Authorization
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: 61b258d7f8b20053f705d74d
 *                     required: true
 *     responses:
 *       200:
 *         description: json answer
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   description: status of the operation
 *                   example: true
 *       400:
 *         description: wrong requestbody params or other mistakes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: status of the response
 *                   example: false
 *                 error_message:
 *                   type: string
 *                   description: message explaining what went wrong
 *                   example: Что-то пошло не так, не удалось добавить
 *       404:
 *         description: missing authorization token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   description: status of the response
 *                   example: 404
 *                 error_message:
 *                   type: string
 *                   description: message explaining what went wrong
 *                   example: Не удалось найти токен авторизации. Авторизуйтесь повторно
 */
