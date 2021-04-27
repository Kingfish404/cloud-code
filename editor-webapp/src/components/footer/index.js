function Footer(props) {

    const style_footer = {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        textAlign: 'center',
        borderTop: '1px solid #dddddd',
    };

    const style_p = {
    }

    return (<footer style={style_footer}>
        <p style={style_p}>版权所有</p>
        <p style={style_p}>2021</p>
    </footer>)
}

export default Footer();