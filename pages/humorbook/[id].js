import { useRouter } from 'next/router'
import React, { useState } from 'react';
import Layout from '../../components/layout'
import { Container, Button, Icon, Image, Item, Label } from 'semantic-ui-react'
import useSwr from 'swr'
import axios from 'axios';
const fetcher = (url) => fetch(url).then((res) => {
    return res.json()
})

export default function Post() {
    const router = useRouter()
    const { id } = router.query;

    console.log('router.qyery : '  +  router.query)

    console.log('pid:',router.query.id)
    // const { data, error } = useSwr(`/api/user/${router.query.id}`, fetcher)
    const { data, error } = useSwr(`/api/humorbook/${router.query.id}`, fetcher, {
        onSuccess: (data) => {
            console.log(data)
        }
    })

    // axios.post(`/api/humorbook/${router.query.id}`, {
    //     id: 'idbbbbb',
    //     name: 'blabla~~~'
    //   });
    if (!data) return <div>Loading...</div>
    return (

        <Layout>
            {data.map((imgs) => (

                <div key={imgs}>
                    {imgs.title}
                    {imgs.imgs.map((img) => (
                        <img src={`${img.src}`} key={img}  />
                    ))}
                </div>


            ))}
        </Layout>

    )

}




