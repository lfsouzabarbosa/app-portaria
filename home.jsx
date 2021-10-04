import { Box } from '@admin-bro/design-system'
import { Button, ButtonCSS } from '@admin-bro/design-system'
import { Link } from '@admin-bro/design-system'
import { Text } from '@admin-bro/design-system'


const Dashboard = () => {

    return (
        <Box flex flexDirection="column" variant="white" alignItems="center">                
                    <img width="170px" src="https://i.pinimg.com/564x/ae/22/9f/ae229fcaf83fa9994031742d25ce84a1.jpg"></img>
            <div>
                <Link href="./admin/resources/Visitante/actions/new">
                    <Button>1º Vez</Button>
                </Link>
                <Link href="./admin/resources/Visita/actions/new">
                    <Button>Visita</Button>
                </Link>
            </div>
        </Box>
    )
}

export default Dashboard