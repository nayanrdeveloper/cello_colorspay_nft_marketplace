import { action, computed, makeObservable, observable } from "mobx";
import { enableStaticRendering } from 'mobx-react-lite'

enableStaticRendering(typeof window === 'undefined')


export class Store{
    isHideSidebar : boolean = false;

    constructor(){
        makeObservable(this,{
            isHideSidebar : observable,
            setIsHideSidebar: action,
            getIsSidebarHide : computed,
        });
    }

    setIsHideSidebar(){
        this.isHideSidebar = !this.isHideSidebar;
    }

    get getIsSidebarHide () : boolean{
        return this.isHideSidebar;
    }

}

// export default new Store;