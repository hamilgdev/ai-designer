import { useState } from 'react'
import parse from 'html-react-parser';
import { Divider, Space, Tag } from 'antd';
import { v4 as uuidv4 } from 'uuid';

const SET_TAG_COLOR = [
  'magenta',
  'red',
  'volcano',
  'orange',
  'gold',
  'lime',
  'green',
  'cyan',
  'blue',
  'geekblue',
  'purple'
]

const templateHeader = `
  <header className="bg-gray-900 text-white py-4">
    <div className="container mx-auto flex justify-between items-center">
      <a href="#" className="text-2xl font-bold">
        <img src="ruta/a/tu/logo.png" alt="Logo de mi empresa" />
      </a>
      <nav>
        <ul className="flex space-x-4">
          <li><a href="#" className="hover:text-gray-300">Inicio</a></li>
          <li><a href="#" className="hover:text-gray-300">Sobre nosotros</a></li>
          <li><a href="#" className="hover:text-gray-300">Servicios</a></li>
          <li><a href="#" className="hover:text-gray-300">Contacto</a></li>
        </ul>
      </nav>
    </div>
  </header>
`

export const FormCreateTemplate = ({ 
  isOpenModal,
  handleModal,
  handleNewBlockTemplate,
  handelCreateTemplate
}) => {

  const [tags, setTags] = useState([])
  const [tag, setTag] = useState({})

  const handleTag = (e) => {
    if (e.key === 'Enter') {
      const newTags = {
        name: e.target.value,
        color: handleRandomTagColor()
      }
      console.log(newTags);
      setTags([...tags, newTags])
      e.target.value = ''
    }
  }
  
  const handleRandomTagColor = () => {
    const randomIndex = Math.floor(Math.random() * SET_TAG_COLOR.length)
    return SET_TAG_COLOR[randomIndex]
  }

  const handleOnsubmit = (e) => {
    e.preventDefault()
    console.log('submit')
    handelCreateTemplate(templateHeader)
  }

  const isActiveModalStyle = isOpenModal ? 'fixed' : 'hidden'

  return (
    <>
      <aside className={`${isActiveModalStyle} p-8  h-full right-0 top-0 bg-slate-50 z-10`}>
        <button onClick={handleModal} className='fixed right-4 top-4'>X</button>
        <form onSubmit={handleOnsubmit}>
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" className='border border-2' />
          </div>

          <div className="flex flex-col">

            <Divider orientation="left">Topics</Divider>
            <div className="p-2">
              <input type="text" name="name" id="name" className='border border-2 w-full' 
                onChange={handleTag}
                onKeyDown={handleTag}
              />
            </div>
            <Space size={[0, 6]} wrap>
              {tags.map((tag, index) => (
                <Tag key={index} color={tag.color}>
                  {tag.name}
                </Tag>
              ))}
            </Space>
          </div>

          <div className="flex flex-col">
            <label htmlFor="name">Description</label>
            <textarea name="" id="" cols="30" rows="10" className='border border-2'></textarea>
          </div>

          <div className="">
            <button className='p-2 bg-green-200 rounded-sm' type='submit'>Generar</button>
          </div>

        </form>
      </aside>
    </>
  )
}

function App() {

  const [template, setTemplate] = useState(null)
  const [htmlTemplates, setHtmlTemplates] = useState([])

  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleNewTemplate = () => handleModal()

  const handelCreateTemplate = (template) => {
    console.log({template});
    const newTemplate = {
      id: uuidv4(),
      htmlElement: templateHeader
    }

    setHtmlTemplates([...htmlTemplates, newTemplate])
    
    setTemplate(null)
    handleModal()
  }

  const handleNewBlockTemplate = (template = '') => {
    const newTemplate = {
      id: uuidv4(),
      htmlElement: template
    }

    setTemplate(newTemplate)
  }

  const handleTemplate = (template) => parse(template)

  const handleModal = () => setIsOpenModal(!isOpenModal)

  console.log({ template });
  console.log({ htmlTemplates });

  return (
    <>
      <div className="relative min-h-screen flex flex-col">

        <section className='flex items-center justify-center border border-2 h-28'>
          <button onClick={() => handleNewBlockTemplate('')}>Geneate a new block</button>
        </section>

        <main className='bg-slate-100'>

          {template && (
            <div className='min-h-[250px] w-full cursor-pointer border border-2 border-dashed border-slate-400'
              onClick={handleNewTemplate}
            >
              {template.htmlElement}
            </div>
          )}

          {htmlTemplates.map((template) => (
            <div key={template.id} className='min-h-[250px] w-full cursor-pointer border border-2 border-dashed border-slate-400'>
              {handleTemplate(template.htmlElement)}
            </div>
          ))}
        </main>

      </div>

      <FormCreateTemplate
        isOpenModal={isOpenModal} 
        handleModal={handleModal} 
        handleNewBlockTemplate={handleNewBlockTemplate}
        handelCreateTemplate={handelCreateTemplate}
      />
    </>
  )
}

export default App
