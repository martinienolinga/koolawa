<?php

/* IMAGLdapBundle::layout.html.twig */
class __TwigTemplate_43b1f96d42d0abc18a67a358a076aea7c033690deb714c70e28755fcd2cd0e67 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
            'imag_ldap_content' => array($this, 'block_imag_ldap_content'),
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_711c3a21d253fef69c1cebc301266f34e9213e63cb57509a47c6501f195a9e54 = $this->env->getExtension("native_profiler");
        $__internal_711c3a21d253fef69c1cebc301266f34e9213e63cb57509a47c6501f195a9e54->enter($__internal_711c3a21d253fef69c1cebc301266f34e9213e63cb57509a47c6501f195a9e54_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "IMAGLdapBundle::layout.html.twig"));

        // line 1
        echo "<!DOCTYPE html>
<html>
    <head>
        <meta charset=\"UTF-8\" />
    </head>
    <body>
        <div>
            ";
        // line 8
        $this->displayBlock('imag_ldap_content', $context, $blocks);
        // line 10
        echo "        </div>
    </body>
</html>";
        
        $__internal_711c3a21d253fef69c1cebc301266f34e9213e63cb57509a47c6501f195a9e54->leave($__internal_711c3a21d253fef69c1cebc301266f34e9213e63cb57509a47c6501f195a9e54_prof);

    }

    // line 8
    public function block_imag_ldap_content($context, array $blocks = array())
    {
        $__internal_3b4c64cca474d485675b467676781c919e525a6e7a757961d6a4a4364c4b0748 = $this->env->getExtension("native_profiler");
        $__internal_3b4c64cca474d485675b467676781c919e525a6e7a757961d6a4a4364c4b0748->enter($__internal_3b4c64cca474d485675b467676781c919e525a6e7a757961d6a4a4364c4b0748_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "imag_ldap_content"));

        // line 9
        echo "            ";
        
        $__internal_3b4c64cca474d485675b467676781c919e525a6e7a757961d6a4a4364c4b0748->leave($__internal_3b4c64cca474d485675b467676781c919e525a6e7a757961d6a4a4364c4b0748_prof);

    }

    public function getTemplateName()
    {
        return "IMAGLdapBundle::layout.html.twig";
    }

    public function getDebugInfo()
    {
        return array (  49 => 9,  43 => 8,  34 => 10,  32 => 8,  23 => 1,);
    }
}
/* <!DOCTYPE html>*/
/* <html>*/
/*     <head>*/
/*         <meta charset="UTF-8" />*/
/*     </head>*/
/*     <body>*/
/*         <div>*/
/*             {% block imag_ldap_content %}*/
/*             {% endblock imag_ldap_content %}*/
/*         </div>*/
/*     </body>*/
/* </html>*/
