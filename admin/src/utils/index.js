export default function formatNumber(num) {
    if(num >= 1000000){
        return (num /1000000).toFixed(1) + 'M'
    }else if(num >= 1000){
        return (num/1000).toFixed(1) + 'K'
    }
    return num.toString();
}


export const links=[
    {
        id:'link-1',
        title:'Home',
        path:'/'
    },
    {
        id:'link-2',
        title:'Contact',
        path:'/contact'
    },
    {
        id:'link-3',
        title:'About',
        path:'/about'
    }
]