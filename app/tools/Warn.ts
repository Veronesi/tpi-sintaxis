import configs from '../configs/configs'

export default {
    show(msg: string){
        if(configs.ENV_MODE)
            console.log(msg)
    },
    title(msg: string){
        if(configs.ENV_MODE)
        console.log(`\x1b[47m\x1b[30m${msg}\x1b[0m`)
    },
    info(msg: string){
        if(configs.ENV_MODE)
        console.log(`\n\x1b[43m\x1b[30m${msg}\x1b[0m`)
    },
    primary(msg: string){
        if(configs.ENV_MODE)
        console.log(`\n\x1b[44m\x1b[30m${msg}\x1b[0m`)
    },

    cyan(msg: string){
        if(configs.ENV_MODE)
        console.log(`\n\x1b[46m\x1b[30m${msg}\x1b[0m`)
    },
    table(msg: Array<any>){
        if(configs.ENV_MODE)
        console.table(msg)
    },
    nodesV(msg: string, title: string, force:boolean = false){
        if(configs.ENV_MODE || force)
        console.log(`${msg}\x1b[46m\x1b[30m${title}\x1b[0m`)
    },
    nodesT(msg: string, title: string, force:boolean = false){
        if(configs.ENV_MODE || force)
        console.log(`${msg}\x1b[42m\x1b[30m${title}\x1b[0m`)
    },

    criticalError(msg: string){
        console.log(`\x1b[31m${msg}\x1b[0m`)
    }
}

