<template>
    <v-container class="grey lighten-4">
        <v-row>
            <v-col cols="12" sm="3">
                <v-card color="#385F73" dark>
                    <v-card-title class="headline">
                        Clients
                    </v-card-title>
                    <v-card-subtitle>
                        Control clients in here
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-btn text to="/clients">
                            To clients
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" sm="3">
                <v-card color="#952175" dark>
                    <v-card-title class="headline">
                        Send via Bot
                    </v-card-title>
                    <v-card-subtitle>
                        Send task data via Telegram bot
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-btn text to="/send">
                            To send
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" sm="3">
                <v-card color="#1F7087" dark>
                    <v-card-title class="headline">
                        Reports
                    </v-card-title>
                    <v-card-subtitle>
                        Control clients reports in here
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-btn text to="/reports">
                            To reports
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="12" sm="3">
                <v-card color="#1F7087" dark>
                    <v-card-title class="headline">
                        Assets
                    </v-card-title>
                    <v-card-subtitle>
                        Control assets
                    </v-card-subtitle>
                    <v-card-actions>
                        <v-btn text to="/assets">
                            To assets
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>