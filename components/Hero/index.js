import * as React from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Typewriter } from 'react-simple-typewriter'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles';
import { LanguageContext } from "../../context/LanguageContext";


export default function Hero() {
  const router = useRouter();
  const clickHandler = () => {
    router.push('/form')
  }

  const { lang, setLang } = React.useContext(LanguageContext);

  const theme = useTheme();


  React.useEffect(() => {
    const langCheck = localStorage.getItem("lang")
   setLang(langCheck)
  }, [])

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundImage:
          theme.palette.mode === 'light'
            ? 'linear-gradient(180deg, #CEE5FD, #FFF)'
            : `linear-gradient(#02294F, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 20%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={2} useFlexGap sx={{ width: { xs: '100%', sm: '70%' } }}>
          <Typography
            variant="h1"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'column' },
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 'clamp(3.5rem, 10vw, 4rem)',
            }}
          >
           { lang === "EN" && "Find your new\u00a0" }
           { lang === "DE" && "Finden Sie Ihr Neues\u00a0" }
           { lang === "VN" && "Tìm kiếm của bạn mới\u00a0" }
            <Typography
              component="span"
              variant="h1"
              sx={{
                fontSize: 'clamp(3rem, 10vw, 4rem)',
                color: (theme) =>
                  theme.palette.mode === 'light' ? 'primary.main' : 'primary.light',
              }}
            >
               <Typewriter words={['Phone!', 'Laptop!']} loop={false} cursor />
            </Typography>
          </Typography>
          <Typography
            textAlign="center"
            color="text.primary"
            sx={{ alignSelf: 'center', width: { sm: '100%', md: '80%' } }}
          >
            {lang === "EN" && "Answer a few basic questions and my algorithm will offer you a few matching devices. You can just pick any of them up and be done! Sounds easy, right?"}
            {lang === "DE" && "Beantworten Sie ein paar grundlegende Fragen und mein Algorithmus wird Ihnen einige passende Geräte vorschlagen. Sie können sich einfach eines davon aussuchen und haben es geschafft! Klingt einfach, oder?"}
            {lang === "VN" && "Trả lời một vài câu hỏi cơ bản và thuật toán của tôi sẽ đề xuất một số thiết bị phù hợp. Bạn chỉ cần chọn bất kỳ thiết bị nào đó và hoàn thành! Công việc đơn giản, phải không?"}
          </Typography>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignSelf="center"
            spacing={1}
            useFlexGap
            sx={{ pt: 2, width: { xs: '100%', sm: 'auto' } }}
          >
            <Button onClick={clickHandler} variant="contained" color="primary">
            {lang === "EN" && "Start now"}
            {lang === "DE" && "Jetzt starten"}
            {lang === "VN" && "Bắt đầu ngay bây giờ"}
            </Button>
          </Stack>
          <Typography variant="caption" textAlign="center" sx={{ opacity: 0.8 }}>
           {lang === "EN" && 'By clicking "Start now" you agree to our'}
           {lang === "DE" && 'Durch Klicken auf "Jetzt starten" stimmen Sie zu:'}
           {lang === "VN" && 'Bằng cách nhấp vào "Bắt đầu ngay bây giờ", bạn đồng ý với:'}
            <Link href="/tos" color="primary">
              {lang === "EN" && "Terms & Conditions"}
              {lang === "DE" && "Nutzungsbedingungen"}
              {lang === "VN" && "Điều khoản sử dụng"}
            </Link>
            .
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}