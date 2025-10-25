import { Box, Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

type DisplayProps = {
  title: string;
  type: string;
  data: {
    net_change: string;
    price: string;
    percentChange: string;
    status: string;
    current_price: string;
    change: string;
    title: string;
    desc: string;
    image?: string;
    company_name: string;
    percent_change: string;
    symbol:string;
  }[];
};

export default function DisplayCard({ title, type, data }: DisplayProps) {
  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%', mx: 'auto', mt: 5 }}>
      {title && (
        <Typography variant="h5" fontWeight="bold" mb={2}>
          {title}
        </Typography>
      )}

      <Box sx={{ display: 'flex' }}>
        {data.slice(0, 3).map((item, i) => (
          <Box key={i} px={2}>
            {i < 5 ? (
              <Card
                onClick={() => navigate('/stock/' + item?.symbol)}
                sx={{
                  borderRadius: 3,
                  backgroundColor: type === 'gain' ? '#F0FFF0' : 'white',
                  border:
                    type === 'gain'
                      ? '1.5px solid #06402B'
                      : '1.5px solid #BF0A30',
                  height: '200px',
                  width: '400px',
                  cursor: 'pointer',
                }}
              >
                <CardContent>
                  <div className="font-bold">{item.company_name}</div>
                  <div>
                    <img
                      src={item?.image}
                      alt="company"
                      className="w-[50px] h-[50px]"
                    />
                  </div>
                  <div className="flex justify-between m-5">
                    <div className='font-bold '>{item.current_price}</div>
                    <div
                      className={
                        type === 'gain'
                          ? 'text-green-400 font-bold'
                          : 'text-red-400 font-bold'
                      }
                    >
                      {type === 'gain'
                        ? '+' +
                          item?.net_change +
                          ' (' +
                          item?.percent_change +
                          '%)'
                        : item?.net_change +
                          ' (' +
                          item?.percent_change +
                          '%)'}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card
                sx={{
                  boxShadow:"none",
                  backgroundColor:'transparent',
                  height: '200px',
                  width: '100px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': { transform: 'scale(1.05)' },
                }}
                onClick={() => console.log('View more clicked')}
              >
                <ArrowForwardIcon sx={{ fontSize: 50, color: type === 'gain'?'green':'red' }} />
                <Typography
                  variant="body1"
                  sx={{ mt: 1, fontWeight: "bold", color: type === 'gain'?'green':'red' }}
                >
                  More
                </Typography>
              </Card>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}
