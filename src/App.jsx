import { useState } from 'react'
import parse from 'html-react-parser';
import { Divider, Space, Tag } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import Loading from './Loading';

const API_END_POINT = 'https://xeidmk2yfm.eu-west-1.awsapprunner.com/ai/coding'

const PRESET_TEMPLATES = [
  {
    id: 1,
    name: 'navbar',
    title: 'Navbar',
    htmlElement: `<nav class="flex flex-wrap items-center justify-between bg-gray-500 p-6"><div class="mr-6 flex flex-shrink-0 items-center text-white">
        <svg class="mr-2 h-8 w-8 fill-current" width="54" height="54" viewBox="0 0 54 54" xmlns="http://www.w3.org/2000/svg"><path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" /></svg>
        <span class="text-xl font-semibold tracking-tight">Logo</span>
      </div>
    <div class="block w-full flex-grow lg:flex lg:w-auto lg:items-center">
      <div class="text-sm lg:flex-grow">
        <a href="#" class="mr-4 mt-4 block text-white hover:text-gray-200 lg:mt-0 lg:inline-block"> Option 1 </a>
        <a href="#" class="mr-4 mt-4 block text-white hover:text-gray-200 lg:mt-0 lg:inline-block"> Option 2 </a>
      </div>
      <div>
        <a href="#" class="mt-4 inline-block rounded border border-white px-4 py-2 text-sm leading-none text-white hover:border-transparent hover:bg-white hover:text-gray-500 lg:mt-0">Action</a>
      </div>
    </div>
  </nav>
`
  },
  {
    id: 2,
    title: 'Header',
    name: 'header',
    htmlElement: `
    <header class="bg-gray-500 py-6">
    <div class="container mx-auto flex items-center justify-between">
      <div class="text-white">
        <h1 class="mb-4 text-4xl font-bold">texto1</h1>
        <p class="mb-8 text-lg">texto 2</p>
        <a href="#" class="rounded-lg bg-white px-6 py-3 font-medium text-gray-500 hover:bg-gray-200">action</a>
      </div>
    </div>
  </header>
`
  },
  {
    id: 3,
    title: 'Footer',
    name: 'footer',
    htmlElement: `
    <footer class="bg-white shadow dark:bg-gray-800">
    <div class="mx-auto w-full max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
      <span class="text-sm text-gray-500 dark:text-gray-400 sm:text-center">© 2023 <a href="https://flowbite.com/" class="hover:underline">Flowbite™</a>. All Rights Reserved. </span>
      <ul class="mt-3 flex flex-wrap items-center text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">About</a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
        </li>
        <li>
          <a href="#" class="mr-4 hover:underline md:mr-6">Licensing</a>
        </li>
        <li>
          <a href="#" class="hover:underline">Contact</a>
        </li>
      </ul>
    </div>
  </footer>
`
  },
  {
    id: 4,
    title: 'Form',
    name: 'form',
    htmlElement: '<form class="w-full max-w-sm p-4"> <div class="mb-6 md:flex md:items-center"> <div class="md:w-1/3"> <label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right" for="inline-full-name"> Full Name </label> </div> <div class="md:w-2/3"> <input class="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none" id="inline-full-name" type="text" value="Jane Doe" /> </div> </div> <div class="mb-6 md:flex md:items-center"> <div class="md:w-1/3"> <label class="mb-1 block pr-4 font-bold text-gray-500 md:mb-0 md:text-right" for="inline-password"> Password </label> </div> <div class="md:w-2/3"> <input class="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-purple-500 focus:bg-white focus:outline-none" id="inline-password" type="password" placeholder="******************" /> </div> </div> <div class="mb-6 md:flex md:items-center"> <div class="md:w-1/3"></div> <label class="block font-bold text-gray-500 md:w-2/3"> <input class="mr-2 leading-tight" type="checkbox" /> <span class="text-sm"> Send me your newsletter! </span> </label> </div> <div class="md:flex md:items-center"> <div class="md:w-1/3"></div> <div class="md:w-2/3"> <button class="focus:shadow-outline rounded bg-purple-500 px-4 py-2 font-bold text-white shadow hover:bg-purple-400 focus:outline-none" type="button">Accept</button> </div> </div> </form>'
  },
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
  handelCreateTemplate,
  setIsLoading
}) => {

  const [formValue, setFormValue] = useState({})

  const handleOnsubmit = async(e) => {
    e.preventDefault()
    const htmlelement = PRESET_TEMPLATES[3].htmlElement
    setIsLoading(true)
    const PROMT_MESSAGE = `${formValue.description}, tailwind, ${htmlelement} `

    console.log({PROMT_MESSAGE});
    try {
      const response = await fetch(API_END_POINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'vDWvKABck3xgEzoPHVHcE8n0DCkVhUT3',
          Cookie: 'i18n_redirected=es'
        },
        body: JSON.stringify({
          prompt: PROMT_MESSAGE
        })
      })
  
      if (response.ok) {
        const data = await response.json()
        console.log(data);
        console.log(data.response);
        setIsLoading(false)
        handelCreateTemplate(data.response.content)
      }

    } catch (error) {
      console.error(error);
    }

    // handelCreateTemplate(templateHeader)
  }

  const handleOnChange = (e) => {
    const { value } = e.target

    setFormValue({ 
      ...formValue,
      description: value
    })
  }

  const handleSelectorTemplate = (e) => {
    const { value } = e.target
    console.log(value);

    const templateChosen = PRESET_TEMPLATES.filter((template) => template.value === value)
    console.log('templateChosen', templateChosen);

    setFormValue({ 
      ...formValue,
      selector: value
    })
  }

  const isActiveModalStyle = isOpenModal ? 'fixed' : 'hidden'

  const handleTemplateChosen = (template) => {
    console.log('template', template);
    setFormValue({ 
      ...formValue,
      htmlElement: template
    })
  }

  console.log(formValue);

  return (
    <>
      <aside className={`${isActiveModalStyle} p-8  h-full right-0 top-0 bg-slate-50 z-10`}>
        <button onClick={handleModal} className='fixed right-4 top-4'>X</button>
        <form onSubmit={handleOnsubmit}>
          <div className="py-2">
            <select onChange={handleSelectorTemplate}>
              {PRESET_TEMPLATES.map((template) => (
                <option key={template.id} value={template.selector}
                  onChange={() => handleTemplateChosen(template.htmlElement)}
                >{template.title}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label htmlFor="name">Description</label>
            <textarea name="" id="" cols="30" rows="10" className='border border-2'
              onChange={handleOnChange}
              value={formValue.description}
            ></textarea>
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
  const [isLoading, setIsLoading] = useState(false)

  const [isOpenModal, setIsOpenModal] = useState(false)

  const handleNewTemplate = () => handleModal()
  setIsLoading
  const handelCreateTemplate = (template) => {
    console.log('response', template);

    const newTemplate = {
      id: uuidv4(),
      htmlElement: template
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

  const templateIsloadingStyles = !isLoading ? 'min-h-[250px]' : 'hidden'

  return (
    <>
      <div className="relative min-h-screen flex flex-col">

        <section className='flex items-center justify-center border border-2 h-28'>
          <button onClick={() => handleNewBlockTemplate('')}>Geneate a new block</button>
        </section>

        <main className='bg-slate-100'>

          {template && (
            <div className={`${templateIsloadingStyles} w-full cursor-pointer border border-2 border-dashed border-slate-400`}
              onClick={handleNewTemplate}
            >
              {template.htmlElement}
            </div>
          )}

          {isLoading  && 
          (<div className='flex items-center justify-center'>
            <Loading />
          </div>)
          }

          {!isLoading && htmlTemplates.map((template) => (
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
        setIsLoading={setIsLoading}
      />
    </>
  )
}

export default App
