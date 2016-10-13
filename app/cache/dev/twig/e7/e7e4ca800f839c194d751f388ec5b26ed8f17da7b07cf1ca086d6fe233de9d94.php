<?php

/* TwigBundle:Exception:error.rdf.twig */
class __TwigTemplate_08f52f29abb461366df0ecec9ca86365231a0f74c4f386c626e5ee47252894f5 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_c6b38a713a9475fa423bd9726d4dcab3ae8092a4523665506636f5e1b992f261 = $this->env->getExtension("native_profiler");
        $__internal_c6b38a713a9475fa423bd9726d4dcab3ae8092a4523665506636f5e1b992f261->enter($__internal_c6b38a713a9475fa423bd9726d4dcab3ae8092a4523665506636f5e1b992f261_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:error.rdf.twig"));

        // line 1
        $this->loadTemplate("@Twig/Exception/error.xml.twig", "TwigBundle:Exception:error.rdf.twig", 1)->display($context);
        
        $__internal_c6b38a713a9475fa423bd9726d4dcab3ae8092a4523665506636f5e1b992f261->leave($__internal_c6b38a713a9475fa423bd9726d4dcab3ae8092a4523665506636f5e1b992f261_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:error.rdf.twig";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* {% include '@Twig/Exception/error.xml.twig' %}*/
/* */
