import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import rectaVite from '../../assets/img/React+Vite.png';
import express from '../../assets/img/Express.jpg';
import mysql from '../../assets/img/MySQL.png';
import jsonWeb from '../../assets/img/JWT.png';

function TecnologíasUtilizadas() {

    const cardData = [
        { title: 'React + Vite', subtitle: 'Biblioteca moderna y rápida', img: rectaVite },
        { title: 'MySQL', subtitle: 'Motor de bases de datos relacionales', img: mysql },
        { title: 'JWT', subtitle: 'Autenticación de usuarios jsonwebtoken', img: jsonWeb },
        { title: 'Express.js', subtitle: 'Framework para desarrollar aplicaciones web', img: express }
    ];

    return (
        <Grid container spacing={2}>
            {cardData.map((data, index) => (
                <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
                    <Card sx={{ display: 'flex', alignItems: 'center', padding: '3%' }} className="card-tecnology">
                        <CardMedia
                            component="img"
                            sx={{ width: 120, height: 120, borderRadius: '70%' }}
                            image={data.img}
                            alt={data.title}
                        />
                        <CardContent>
                            <Typography variant="h6" component="div">
                                {data.title}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {data.subtitle}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

export { TecnologíasUtilizadas }