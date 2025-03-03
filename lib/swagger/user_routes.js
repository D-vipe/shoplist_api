/**
 * @swagger
 * /api/user:
 *   put:
 *     summary: Registration process
 *     description: Registration process
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                type: object
 *                properties:
 *                  name:
 *                    type: string
 *                    example: John
 *                  surname:
 *                    type: string
 *                    example: Doe
 *                  email:
 *                    type: string
 *                    example: test@test.com
 *                  phone:
 *                    type: string
 *                    example: 89001003040
 *                  password:
 *                    type: string
 *                    example: $2b$10$W6Mnjf/vbICmrvUCuCyHtugnMUz5FxClkpfcPXIghNdX/GbXjui
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
 *                   description: user data
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 61b258d7f8b20053f705d74d
 *                     name:
 *                       type: string
 *                       example: John
 *                     surname:
 *                       type: string
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       example: test@test.com
 *                     phone:
 *                       type: string
 *                       example: 89001003040
 *
 *
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
 *                   example: Что-то пошло не так, не удалось добавить пользователя
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login process
 *     description: Login process. If successful, user recieves cookies with authorization token
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
 *                   email:
 *                     type: string
 *                     example: test@test.com
 *                   password:
 *                     type: string
 *                     example: yourpassword
 *     responses:
 *       200:
 *         headers:
 *           Cookie:
 *             name: Authorization
 *             schema:
 *               type: string
 *             description: authorization token value
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
 *                   description: user data
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 61b258d7f8b20053f705d74d
 *                     name:
 *                       type: string
 *                       example: John
 *                     surname:
 *                       type: string
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       example: test@test.com
 *                     phone:
 *                       type: string
 *                       example: 89001003040
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
 *                   example: Что-то пошло не так, не удалось добавить пользователя
 */

/**
 * @swagger
 * /api/user/getById:
 *   post:
 *     summary: Get user by id
 *     description: Get user by id
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
 *                   description: user data
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 61b258d7f8b20053f705d74d
 *                     name:
 *                       type: string
 *                       example: John
 *                     surname:
 *                       type: string
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       example: test@test.com
 *                     phone:
 *                       type: string
 *                       example: 89001003040
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
 *                   example: Что-то пошло не так, не удалось добавить пользователя
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
 * /api/user/update:
 *   patch:
 *     summary: Update user
 *     description: Update user
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
 *                     example: John
 *                     required: false
 *                   surname:
 *                     type: string
 *                     example: Doe
 *                     required: false
 *                   email:
 *                     type: string
 *                     example: test@test.com
 *                     required: false
 *                   phone:
 *                     type: string
 *                     example: 89001003040
 *                     required: false
 *                   password:
 *                     type: string
 *                     example: newpass
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
 *                   description: user data
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 61b258d7f8b20053f705d74d
 *                     name:
 *                       type: string
 *                       example: John
 *                     surname:
 *                       type: string
 *                       example: Doe
 *                     email:
 *                       type: string
 *                       example: test@test.com
 *                     phone:
 *                       type: string
 *                       example: 89001003040
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
 *                   example: Что-то пошло не так, не удалось добавить пользователя
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
 * /api/user/loggingOut:
 *   post:
 *     summary: Update user
 *     description: Update user
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
 */
