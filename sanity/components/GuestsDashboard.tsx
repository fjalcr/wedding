import { Card, Container, Grid, Text, Stack, Box, Button, Flex } from '@sanity/ui'
import { useClient } from 'sanity'
import { useEffect, useState } from 'react'
import { apiVersion } from '../env'
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

export function GuestsDashboard() {
    const client = useClient({ apiVersion })
    const [guests, setGuests] = useState<any[]>([])

    const stats = guests.reduce((acc: any, guest: any) => {
        acc.totalInvites++
        const companions = guest.companions || 0
        acc.totalGuests += 1 + companions

        if (guest.confirm) {
            acc.confirmedInvites++
            const confirmedCompanions = guest.companionsConfirmed || 0
            acc.confirmedGuests += 1 + confirmedCompanions
        }
        return acc
    }, {
        totalInvites: 0,
        confirmedInvites: 0,
        totalGuests: 0,
        confirmedGuests: 0
    })

    useEffect(() => {
        const fetchGuests = async () => {
            const data = await client.fetch(`*[_type == "guests"] | order(nombre asc)`)
            setGuests(data)
        }
        fetchGuests()
    }, [client])

    const generatePDF = () => {
        const doc = new jsPDF()

        doc.setFontSize(18)
        doc.text("Resumen de Invitados", 14, 22)

        doc.setFontSize(11)
        doc.text(`Total Invitaciones: ${stats.totalInvites}`, 14, 30)
        doc.text(`Confirmadas: ${stats.confirmedInvites}`, 14, 36)
        doc.text(`Total Personas: ${stats.totalGuests}`, 14, 42)
        doc.text(`Personas Confirmadas: ${stats.confirmedGuests}`, 14, 48)

        const tableData = guests.map(guest => [
            guest.nombre,
            guest.companions ? `+${guest.companions}` : '0',
            guest.confirm ? `SI (${guest.companionsConfirmed ? '+' + guest.companionsConfirmed : '0'})` : 'NO',
            `https://www.adrianayeduardo.com/?guest=${guest._id}`
        ])

        autoTable(doc, {
            head: [['Nombre', 'Acomp.', 'Confirmado', 'Link']],
            body: tableData,
            startY: 55,
        })

        doc.save("invitados-boda.pdf")
    }

    return (
        <Container width={2} padding={4}>
            <Stack space={5}>
                <Stack space={4}>
                    <Flex justify="space-between" align="center">
                        <Text size={4} weight="bold">Resumen de Invitados</Text>
                        <Button
                            text="Descargar PDF"
                            tone="primary"
                            onClick={generatePDF}
                        />
                    </Flex>

                    <Grid columns={[2, 2, 4]} gap={3}>
                        <Card padding={4} border radius={2}>
                            <Stack space={3}>
                                <Text size={1} muted>Total Invitaciones</Text>
                                <Text size={4} weight="bold">{stats.totalInvites}</Text>
                            </Stack>
                        </Card>

                        <Card padding={4} border radius={2}>
                            <Stack space={3}>
                                <Text size={1} muted>Invitaciones Confirmadas</Text>
                                <Text size={4} weight="bold" style={{ color: 'green' }}>{stats.confirmedInvites}</Text>
                            </Stack>
                        </Card>

                        <Card padding={4} border radius={2}>
                            <Stack space={3}>
                                <Text size={1} muted>Total Personas (Est.)</Text>
                                <Text size={4} weight="bold">{stats.totalGuests}</Text>
                            </Stack>
                        </Card>

                        <Card padding={4} border radius={2}>
                            <Stack space={3}>
                                <Text size={1} muted>Personas Confirmadas</Text>
                                <Text size={4} weight="bold" style={{ color: 'green' }}>{stats.confirmedGuests}</Text>
                            </Stack>
                        </Card>
                    </Grid>
                </Stack>

                <Stack space={3}>
                    <Text size={2} weight="bold">Lista de Invitados</Text>
                    {guests.map((guest) => (
                        <Card key={guest._id} padding={3} border radius={2}>
                            <Grid columns={[1, 3]} gap={2}>
                                <Box>
                                    <Stack space={2}>
                                        <Text weight="bold">{guest.nombre}</Text>
                                        <Text size={1} muted>
                                            {guest.companions ? `+${guest.companions} acompañantes` : 'Sin acompañantes'}
                                        </Text>
                                    </Stack>
                                </Box>

                                <Box>
                                    {guest.confirm ? (
                                        <Text size={1} style={{ color: 'green' }}>
                                            ✅ Confirmado {guest.companionsConfirmed ? `(+${guest.companionsConfirmed})` : ''}
                                        </Text>
                                    ) : (
                                        <Text size={1} style={{ color: 'orange' }}>⏳ Pendiente</Text>
                                    )}
                                </Box>

                                <Box>
                                    <Text size={1} style={{ wordBreak: 'break-all' }}>
                                        <a
                                            href={`https://www.adrianayeduardo.com/?guest=${guest._id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ color: '#2276fc', textDecoration: 'none' }}
                                        >
                                            Abrir invitación &rarr;
                                        </a>
                                    </Text>
                                </Box>
                            </Grid>
                        </Card>
                    ))}
                </Stack>
            </Stack>
        </Container>
    )
}

