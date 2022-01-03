import {extendTheme} from "@chakra-ui/react"

import bg from "../sources/bg.jpg"
export default extendTheme({
  styles: {
    global: {
      body: {
        backgroundImage: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        fontSize: "16px",
        w: "100%",
        minH: "100vh",
      },
    },
  },
})
