import React from 'react'

const LandingPage = () => {
  return (
    <div className="page-body container flex column">
      <h1>WELCOME TO POGO2GO</h1>
      <img src="HomePage.jpg" />
      <div className="flex row justify-center">
        <div className="flex column box-1">
          <h2>Can't wait to get hopping?</h2>
          <p>Keytar vape actually DIY four loko selvage tousled. Art party dreamcatcher cronut, copper mug affogato food truck enamel pin leggings keytar migas. Iceland chia hella succulents, four loko kombucha lyft. Cardigan listicle ugh actually, gochujang craft beer seitan meh kale chips before they sold out you probably haven't heard of them poutine kickstarter drinking vinegar. Health goth portland austin, bespoke YOLO palo santo lomo four dollar toast bicycle rights.</p>
        </div>
        <img className="box-1" src="cannot_wait.jpg" />
      </div>
      <div className="flex row justify-center">
        <img className="box-1" src="everybody_loves.jpg" />
        <div className="flex column box-1">
          <h2>Everyone loves pogo sticks!!</h2>
          <p>Af flexitarian pinterest austin tofu iceland echo park four dollar toast listicle bespoke live-edge. Chambray twee yr plaid fanny pack, beard direct trade street art echo park kogi dreamcatcher farm-to-table. Art party synth af celiac edison bulb meditation health goth godard pabst blog food truck pitchfork. Sartorial bitters YOLO ugh, kinfolk ramps occupy cornhole pinterest authentic cray venmo normcore. Truffaut gentrify hot chicken blog.</p>
        </div>
      </div>
    </div>
  )
}

export default LandingPage
