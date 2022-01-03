import {useState, useEffect} from "react"
import {
  Flex,
  VStack,
  Input,
  Button,
  Text,
  Heading,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react"
import {v4 as uuidv4} from "uuid"
// const initRegalos = [
//   {id: uuidv4(), name: "Medias ", count: 1},
//   {id: uuidv4(), name: "caramelos", count: 2},
//   {id: uuidv4(), name: "Vitel Tone", count: 3},
// ]

function App() {
  const [regalos, setRegalos] = useState([])
  const [newRegalo, setNewRegalo] = useState("")
  const [error, setError] = useState("")
  const [newRegaloCount, setNewRegaloCount] = useState(1)

  useEffect(() => {
    if (localStorage.getItem("regalos")) {
      setRegalos(JSON.parse(localStorage.getItem("regalos")))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("regalos", JSON.stringify(regalos))
  }, [regalos])

  const handleAddRegalo = (e) => {
    e.preventDefault()
    if (validateRegalos()) {
      setRegalos([...regalos, {id: uuidv4(), name: newRegalo, count: newRegaloCount}])
    }
  }
  const handleClearRegalos = () => {
    setRegalos([])
    setNewRegalo("")
    setNewRegaloCount(1)
  }
  const handleDeleteRegalo = (id) => {
    setRegalos(regalos.filter((regalo) => regalo.id !== id))
  }
  const validateRegalos = () => {
    if (newRegalo.trim().length === 0) {
      setError("Agregue regalos para enviar")
      setNewRegalo("")
      setNewRegaloCount(1)

      return false
    }

    for (let regalo of regalos) {
      if (regalo.name.trim().toLocaleUpperCase() === newRegalo.toLocaleUpperCase()) {
        setError("ya existe un regalo con ese nombre")
        setNewRegalo("")
        setNewRegaloCount(1)

        return false
      }
    }
    setNewRegalo("")
    setNewRegaloCount(1)

    return true
  }
  const renderRegalos = () =>
    regalos.map((regalo) => (
      <Flex key={regalo.id} justifyContent="space-between" w="100%">
        <Text>{regalo.name}</Text>
        <Text>X{regalo.count}</Text>
        <Button colorScheme="red" size="xs" onClick={() => handleDeleteRegalo(regalo.id)}>
          X
        </Button>
      </Flex>
    ))

  return (
    <Flex alignItems="center" justifyContent="center" minH="100vh" w="100%">
      <VStack background="white" boxShadow="md" p={4} w="360px">
        <Heading fontFamily="'Mountains of Christmas'"> Regalos</Heading>
        <Flex as="form" gap={2} onSubmit={handleAddRegalo}>
          <Input
            placeholder="Regalo"
            value={newRegalo}
            onChange={(e) => setNewRegalo(e.target.value)}
          />
          <NumberInput
            defaultValue={1}
            max={99}
            min={1}
            value={newRegaloCount}
            w="40%"
            onChange={(countString) => setNewRegaloCount(Number(countString))}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Button colorScheme="red" type="submit">
            Agregar
          </Button>
        </Flex>
        <Text color="red"> {error}</Text>
        {regalos.length !== 0 ? (
          renderRegalos()
        ) : (
          <Text color="gray.400">No hay regalos Grinch!! agrega uno .</Text>
        )}

        {regalos.length !== 0 && (
          <Button colorScheme="red" w="100%" onClick={handleClearRegalos}>
            Borrar Todo
          </Button>
        )}
      </VStack>
    </Flex>
  )
}

export default App
