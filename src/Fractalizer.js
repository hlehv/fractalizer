import React from 'react';

class Fractalizer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            scale: 1,
            offx: 0,
            offy: 0,
            cx: 0,
            cy: 0,
        }
        this.handleClick = this.handleClick.bind(this);
    }
    
    componentDidMount(){
        this.displayMand();
    }
    
    componentDidUpdate(){
        this.displayMand();
    }

    displayMand = () => {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");

        ctx.fillStyle="#000000";
        ctx.fillRect(0,0, canvas.width,canvas.height);
        
        for (let i = 0; i < canvas.width; i+=1){
            for (let j = 0; j < canvas.height; j+=1){
                var imgData = ctx.getImageData(i, j, 1, 1);
                let data = imgData.data;
                for(let k = 0; k < data.length; k++){
                    if((k % 4) ===0){
                        let result = this.mandelbrot(i,j);
                        if (result >= 999){
                            imgData.data[k] =0;
                            imgData.data[k+1] = 0;
                            imgData.data[k+2] = 0;
                        }
                        else{
                            if (!this.props.red&&!this.props.green&&!this.props.blue)
                            {
                                imgData.data[k+3] = (140+ Math.sin(.2*result+0)*115)%255;
                            }
                            else{
                                if(this.props.red){
                                    imgData.data[k] = (140+ Math.sin(.2*result+0)*115)%255;
                                }
                                if (this.props.green){
                                    imgData.data[k+1] = (140+ Math.sin(.2*result+2)*115)%255;
                                }
                                if (this.props.blue){
                                    imgData.data[k+2] = (140+ Math.sin(.2*result+4)*115)%255;
                                }
                            }
                        }
                    }
                }
                ctx.putImageData(imgData, i, j);
            }
        }
    }


   mandelbrot(i, j){
        const canvas = this.refs.canvas;
        let creal = (((i + this.state.offx/this.state.scale)-(canvas.width/2))/canvas.width)*4*this.state.scale;//to get offset, subtract mouse position from half width and half height
        let cimg = (((canvas.height/2)-j+ (this.state.offy/this.state.scale))/canvas.width)*4*this.state.scale;
        const MAX = 1000;
        let iteration = 0;
        let x = 0;
        let y = 0;
        while ((((x**2) + (y**2)) < 4) && iteration < MAX){
            let newx = x**2 - y**2 + creal;
            y = 2*x*y + cimg;
            x = newx;
            iteration++;
        }
        if (iteration > MAX){
            return 1001;
        }
        else{
            return iteration;
        }
    }

    handleClick = (event) => {
            const canvas = this.refs.canvas;
            let rect = canvas.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let strictx = (parseInt(x, 10) - (canvas.width/2))*this.state.scale;
            let y = event.clientY - rect.top;
            let stricty = ((canvas.width/2) - parseInt(y, 10))*this.state.scale;
            console.log("x: " + x + " y: " + y);
            this.setState({
                scale: this.state.scale * .5,
                offx: this.state.offx + strictx,
                offy: this.state.offy + stricty,
            });
    }


    render(){
        return(
            <div>
                {/*this.displayMand()*/}
                <canvas ref="canvas" onMouseDown={(event) => this.handleClick(event)} width={this.props.size} height={this.props.size} />
            </div>
        )
    }
}

export default Fractalizer;