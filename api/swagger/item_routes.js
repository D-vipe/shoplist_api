/**
 * @swagger
 * /api/item:
 *   post:
 *     summary: Get all shopping list's items
 *     description: Get all shopping list's items
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
 *                   list_id:
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
 *                       list_id:
 *                         type: string
 *                         example: 61b258d7f8b20053f705d74d
 *                       price:
 *                         type: integer
 *                         example: 74
 *                       amount:
 *                         type: integer
 *                         example: 3
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
 *                   example: Что-то пошло не так
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
 * /api/item/getById:
 *   post:
 *     summary: Get item details
 *     description: Get item details
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
 *                     list_id:
 *                       type: string
 *                       example: 61b258d7f8b20053f705d74d
 *                     price:
 *                       type: integer
 *                       example: 74
 *                     amount:
 *                       type: integer
 *                       example: 3
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
 *                   example: Что-то пошло не так, не удалось получить данные
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
 * /api/item:
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
 *                     example: List for evening
 *                   list_id:
 *                     type: string
 *                     example: 61b258d7f8b20053f705d74d
 *                   price:
 *                     type: integer
 *                     example: 74
 *                   amount:
 *                     type: integer
 *                     example: 3
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
 *                   name:
 *                     type: string
 *                     example: List for evening
 *                   list_id:
 *                     type: string
 *                     example: 61b258d7f8b20053f705d74d
 *                   price:
 *                     type: integer
 *                     example: 74
 *                   amount:
 *                     type: integer
 *                     example: 3
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
 *                   example: Что-то пошло не так, не удалось добавить данные
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
 * /api/item/update:
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
 *                   price:
 *                     type: integer
 *                     example: 74
 *                   amount:
 *                     type: integer
 *                     example: 3
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
 *                   name:
 *                     type: string
 *                     example: List for evening
 *                   list_id:
 *                     type: string
 *                     example: 61b258d7f8b20053f705d74d
 *                   price:
 *                     type: integer
 *                     example: 74
 *                   amount:
 *                     type: integer
 *                     example: 3
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
 *                   example: Что-то пошло не так, не удалось обновить данные
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
 * /api/item:
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
 *                   list_id:
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
 *                   example: Что-то пошло не так, не удалось удалить
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
