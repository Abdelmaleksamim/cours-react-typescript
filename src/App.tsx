import './App.css'
import Alert from './components/ui/Alert/Alert'
import {BellRing,Ban, Info,LaptopMinimalCheck,MessageCircle } from 'lucide-react'

function App() {
  return (
      <div>
        <Alert type={"alert-danger"}  title={"Something went wrong"} icon={ <Ban size={20}/> } description='                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officia tenetur doloribus enim ratione ipsam distinctio
                nam consequatur provident veniam mollitia.'/>
        <Alert type={"alert-warning"}  title={"Tips & Tricks"} icon={ <MessageCircle size={20}/> } description='                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officia tenetur doloribus enim ratione ipsam distinctio
                nam consequatur provident veniam mollitia.'/>
        <Alert type={"alert-default"}  title={"Upgrade your plan"} icon={ <BellRing size={20}/> } description='                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officia tenetur doloribus enim ratione ipsam distinctio
                nam consequatur provident veniam mollitia.'/>
        <Alert type={"alert-success"}  title={"Your Order Has Been proccessed"} icon={ <LaptopMinimalCheck size={20}/> } description='                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officia tenetur doloribus enim ratione ipsam distinctio
                nam consequatur provident veniam mollitia.'/>
        <Alert type={"alert-info"}  title={"Note"} icon={ <Info size={20}/> } description='                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Officia tenetur doloribus enim ratione ipsam distinctio
                nam consequatur provident veniam mollitia.'/>
      </div>

  )
}

export default App
