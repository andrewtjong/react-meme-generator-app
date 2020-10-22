import React from "react"
     /**
     * We'll be using an API that provides a bunch of meme images.
     * 
     * Your task:
     * make an API call to "https://api.imgflip.com/get_memes" and save the 
     * data that comes back (`response.data.memes`) to a new state property
     * called `allMemeImgs`. (The data that comes back is an array)
     */
    

class MemeGenerator extends React.Component {
    constructor() {
        super()
        this.state ={
            topText: "",
            bottomText: "",
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: [],
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then (response => {
            const {memes} = response.data
            console.log(memes[0])
            this.setState({
                allMemeImgs: memes
            })
        })
    }

    handleChange(event){
        const { name, value } = event.target
        this.setState({[name]: value})
    }

    handleSubmit(event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.allMemeImgs.length)
        const randMemeImg = this.state.allMemeImgs[randNum].url
        this.setState({ randomImg: randMemeImg })
    }

    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.handleSubmit}>
                    <input 
                    type="text"
                    name="topText"
                    placeholder="Top Text"
                    value={this.state.topText}
                    onChange={this.handleChange}
                    />
                    <input 
                    type="text"
                    name="bottomText"
                    placeholder="Bottom Text"
                    value={this.state.bottomText}
                    onChange={this.handleChange}            
                    />
                    <button>Gen </button>
                </form>
                <div className="meme">
                <img src={this.state.randomImg} alt=""/>
                <h2 className="top">{this.state.topText}</h2>
                <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator