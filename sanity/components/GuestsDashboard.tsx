import { Card, Container, Grid, Text, Stack, Box, Button, Flex } from '@sanity/ui'
import { useClient } from 'sanity'
import { useEffect, useState } from 'react'
import { apiVersion } from '../env'


import { generateGuestCode } from '../lib/utils'

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

    const handleGenerateCodes = async () => {
        const guestsToUpdate = guests.filter(g => !g.code);
        if (guestsToUpdate.length === 0) {
            alert("Todos los invitados ya tienen código.");
            return;
        }

        if (!confirm(`Se generarán códigos para ${guestsToUpdate.length} invitados. ¿Continuar?`)) return;

        const transaction = client.transaction();

        guestsToUpdate.forEach(guest => {
            transaction.patch(guest._id, p => p.set({ code: generateGuestCode() }));
        });

        try {
            await transaction.commit();
            alert("Códigos generados correctamente");
            // Refresh data
            const data = await client.fetch(`*[_type == "guests"] | order(nombre asc)`)
            setGuests(data)
        } catch (err) {
            console.error(err);
            alert("Error al generar códigos");
        }
    }

    const generateCSV = () => {
        const headers = ['Nombre', 'Acompañantes', 'Confirmado', 'Confirmados', 'Link'];
        const rows = guests.map(guest => [
            guest.nombre,
            guest.companions || 0,
            guest.confirm ? 'SI' : 'NO',
            guest.companionsConfirmed || 0,
            `https://www.adrianayeduardo.com/?guest=${guest.code || guest._id}`
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'invitados-boda.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <Container width={2} padding={4}>
            <Stack space={5}>
                <Stack space={4}>
                    <Flex justify="space-between" align="center">
                        <Text size={4} weight="bold">Resumen de Invitados</Text>
                        <Flex gap={2}>
                            <Button
                                text="Generar Códigos"
                                tone="positive"
                                onClick={handleGenerateCodes}
                            />
                            <Button
                                text="Descargar CSV"
                                tone="primary"
                                onClick={generateCSV}
                            />
                        </Flex>
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
                                            href={`https://www.adrianayeduardo.com/?guest=${guest.code || guest._id}`}
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
        </Container >
    )
}

