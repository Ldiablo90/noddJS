import React,{Component} from "react";

class HeaderComponent extends Component{
    render(){
        return(
            <div class="f-row header-warpper">
                <div class="logo">logo img Lian</div>
                <div class="header-warpper-web">
                    <div class="header-list-web">
                        <ul>
                            <li><a href="">home</a></li>
                            <li><a href="">second</a></li>
                            <li><a href="">therd</a></li>
                            <li><a href="">fore</a></li>
                            <li><a href="">five</a></li>
                        </ul>
                    </div>
                </div>
                <div class="header-warpper-mobile">
                header-warpper-mobile
                </div>
            </div>
          )
    }
}

export default HeaderComponent;