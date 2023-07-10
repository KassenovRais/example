import { CSSProperties } from "react";


export const labelStyle : CSSProperties = {
    background: '#33658A',
    color: 'white',
    width: '20vw',
    borderRadius: '4px',
    height: '2rem',
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    fontWeight: '700'
}

export const deleteButtonPicture :CSSProperties = {
    position:'relative',
    bottom:'100%',
    left:'84%',
    color : 'red',
    mixBlendMode: 'difference',    
    fontSize:'1.4rem',
}

export const pictureStyle :CSSProperties = {
    width: '100%',
    objectFit:'cover',
    height:'100%',
    borderRadius:'4px',
}
export const itemBlock : CSSProperties = {
    margin: '3vh 1vw',
    padding: '0',
    height:'200px',
}

export const pictureItemBlock : CSSProperties = {
    margin:'2vh 0',
    padding:'30px 30px',
}
export const iconStyle: CSSProperties ={ 
    color: 'gray',
    fontSize: '1.5rem',
    position:'relative',
    bottom:'10vh',
    left:'64%',
}