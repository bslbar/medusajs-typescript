import { Router } from "express"
import bodyParser from "body-parser"

export default () => {  
    const app = Router();

    app.post("/welcome/:cart_id", bodyParser.json(), async (req, res) => {
        const { cart_id } = req.params
        const { optin } = req.body
      
        // Validate that the optin value was provided.
        // If not respond with a Bad Request status
        if (typeof optin !== "boolean") {
          res.status(400).json({
            message: "You must provide an boolean optin value in the request body",
          })
          return
        }
      
        const welcomeService = req.scope.resolve("welcomeService")
      
        try {
          await welcomeService.registerOptin(cart_id, optin)
      
          res.status(200).json({
            success: true,
          })
        } catch (err) {
          // This is not supposed to happen.
          res.status(500).json({
            message: "Something unexpected happened.",
          })
        }
    });
    
    return app
}