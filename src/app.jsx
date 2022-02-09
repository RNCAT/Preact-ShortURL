import { Form } from './form'

export function App(props) {
  return (
    <>
      <div className="container">
        <div className="row flex-middle">
          <div className="sm-3 col"></div>
          <div className="sm-6 col">
            <Form />
          </div>
          <div className="sm-3 col"></div>
        </div>
      </div>
    </>
  )
}
